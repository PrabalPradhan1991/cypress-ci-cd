import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import * as root from "./reducers";

function configureStore(initialState: root.initialStoreInterface) {
  return createStore(
    root.default,
    root.initialStoreState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}

export interface initialStoreInterface extends root.initialStoreInterface {}

const store = configureStore(root.initialStoreState);

export default store;
