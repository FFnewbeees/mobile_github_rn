import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage
} from "react-native";

const KEY = "save_key";

export default class AsyncStorageDemoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: ""
    };
  }

  async doSave() {
    try {
      await AsyncStorage.setItem(KEY, this.value);
    } catch (error) {
      error && console.log(error.toString());
    }

    //second approach - callback
    // AsyncStorage.setItem(KEY, this.value, error => {
    //   error && console.log(error.toString());
    // });

    //third approach - catch
    // AsyncStorage.setItem(KEY, this.value).catch(error => {
    //   error && console.log(error.toString());
    // });
  }

  async doRemove() {
    try {
      await AsyncStorage.removeItem(KEY);
    } catch (error) {
      error && console.log(error.toString());
    }
  }

  async doGet() {
    try {
      const value = await AsyncStorage.getItem(KEY);
      this.setState({ showText: value });
      console.log(value);
    } catch (error) {
      error && console.log(error.toString());
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>AysncStorage</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            this.value = text;
          }}
        />
        <View style={styles.inputContainer}>
          <Text
            onPress={() => {
              this.doSave();
            }}
          >
            Add
          </Text>
          <Text
            onPress={() => {
              this.doRemove();
            }}
          >
            Remove
          </Text>
          <Text
            onPress={() => {
              this.doGet();
            }}
          >
            Get
          </Text>
        </View>

        <Text>{this.state.showText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  textContainer: {
    margin: 5
  },
  input: {
    height: 30,
    borderColor: "black",
    borderWidth: 1,
    margin: 10
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
