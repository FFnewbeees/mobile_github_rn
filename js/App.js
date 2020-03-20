import React, { Component } from "react";
import { Provider } from "react-redux";
import AppNavigator from "./navigators/AppNavigator";
import store from "./store";

export default class App extends Component {
  render() {
    /**
     * 3. pass store to App structure
     */

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
