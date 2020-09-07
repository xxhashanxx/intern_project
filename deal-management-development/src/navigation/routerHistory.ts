import { createBrowserHistory } from "history";

/**
 * Create history object to pass into Router,
 * to allow navigating outside of react
 */
const history = createBrowserHistory();

if (process.env.NODE_ENV === "development") {
  history.listen((location, action) => {
    // console.info('HISTORY', action, location);
  });
}

export const browserHistory = history;
