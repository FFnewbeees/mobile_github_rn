import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import NavigationUtil from "../navigators/NavigationUtil";

export default class WelcomePage extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      NavigationUtil.resetToHomePage(this.props);
    }, 2000);
  }

  componentWillMount() {
    //clean it
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome User</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});