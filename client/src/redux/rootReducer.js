import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./slices/auth";
import employee from "./slices/employee";
import task from "./slices/task";

const authPersistConfig = {
  key: "auth",
  storage,
  keyPrefix: "redux-",
  blacklist: ["isLoggenIn"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  employee,
  task,
});

export default rootReducer;
