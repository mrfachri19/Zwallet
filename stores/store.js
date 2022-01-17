import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";

import rootReducer from "./reducer";

let store = createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware, logger)
);
let persistor = persistStore(store);

export { store, persistor };
