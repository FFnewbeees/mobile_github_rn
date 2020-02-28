import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import ReadMore from "../../components/ReadMore";

export default class MyPage extends Component {
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
                tintColor: "black",
                updateTime: new Date().getTime()
              }
            })
          }
        />
          <ReadMore
            numberOfLines={3}
            _renderRevealedFooter={this._renderRevealedFooter}
            _renderTruncatedFooter={this._renderTruncatedFooter}
            onReady={this._handleTextReady}
          >
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ReadMore>
      </View>
    );
  }
}

_renderTruncatedFooter = handlePress => {
  return (
    <Text
      style={{ color: Colors.tintColor, marginTop: 5 , backgroundColor:'blue'}}
      onPress={handlePress}
    >
      Read more
    </Text>
  );
};

_renderRevealedFooter = handlePress => {
  return (
    <Text
      style={{ color: Colors.tintColor, marginTop: 5 }}
      onPress={handlePress}
    >
      Show less
    </Text>
  );
};

_handleTextReady = () => {
  // ...
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  textContainer:{
    margin:5
  }
});
