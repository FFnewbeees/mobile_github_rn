import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import DataStore from "../expand/dao/DataStore";


export default class DataStoreDemoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: ""
    };

    this.dataStore = new DataStore();
  }

  loadData() {
    let url = `https://api.github.com/search/repositories?q=${this.value}`;
    this.dataStore
      .fetchData(url)
      .then(response => {
        let data = `initial load timestamp: ${new Date(
          response.timestamp
        )} \n  ${JSON.stringify(response.data)}`;

        this.setState({ showText: data });
      })
      .catch(error => error && console.log(error.toString()));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Offline Storage Design</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            this.value = text;
          }}
        />

        <Button title={"Get Data"} onPress={this.loadData()} />

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
