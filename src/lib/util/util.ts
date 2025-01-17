import { initURLSubscription, loadState, updateCodeStore } from './state';
import { analytics, initAnalytics } from './stats';
import { loadDataFromUrl } from './fileLoaders/loader';
import { initLoading } from './loading';
import { applyMigrations } from './migrations';
import { init } from './mermaid';

export const loadStateFromURL = (): void => {
  loadState(window.location.hash.slice(1));
};

export const syncDiagram = (): void => {
  updateCodeStore({
    updateDiagram: true
  });
};

export const initHandler = async (): Promise<void> => {
  applyMigrations();
  await initLoading('Loading Mermaid...', init());
  loadStateFromURL();
  await initLoading('Loading Gist...', loadDataFromUrl().catch(console.error));
  syncDiagram();
  initURLSubscription();
  await initAnalytics();
  await analytics?.page();
};

export const isMac = navigator.platform.toUpperCase().includes('MAC');
export const cmdKey = isMac ? 'Cmd' : 'Ctrl';

let count = 0;
export const errorDebug = (limit = 100) => {
  count += 1;
  if (count > limit) {
    console.log(count, limit);
    // eslint-disable-next-line no-debugger
    debugger;
  }
};
