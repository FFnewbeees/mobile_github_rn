import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default class FavouritePage extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>hello</Text>
        <Button
          title={"Change Theme"}
          onPress={() =>
            navigation.setParams({
              theme: {
                tintColor: "orange",
                updateTime: new Date().getTime()
              }
            })
          }
        />
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
