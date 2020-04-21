import { combineReducers } from "redux";
import theme from "./theme/index";
import popular from "./popular/index";

/**
 * 1. combine reducers
 */

const index = combineReducers({
  theme: theme,
  popular: popular
});

export default index;
