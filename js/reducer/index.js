import { combineReducers } from "redux";
import theme from "./theme/index";

/**
 * 1. combine reducers
 */

const index = combineReducers({
  theme: theme,
});

export default index;
