import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
//import CustomisedCheckBox from '../../components/CustomisedCheckBox';

export default class TrendingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBoxChecked: []
    };
  }

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
                tintColor: "blue",
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
    justifyContent: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
