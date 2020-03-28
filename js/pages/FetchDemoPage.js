import React, { Component } from "react";
import { View, Button, Text, StyleSheet, TextInput } from "react-native";

export default class FetchDemoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: ""
    };
  }

  loadData() {
    //https://api.github.com/search/repositories?q=javascript
    let url = `https://api.github.com/search/repositories?q=${this.searchKeyword}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error("Network Response Error");
      })
      .then(responseText => {
        this.setState({ showText: responseText });
      })
      .catch(error => {
        this.setState({ showText: error.toString() });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Fetch</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              this.searchKeyword = text;
            }}
          />
          <Button title={"Search"} onPress={() => this.loadData()} />
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
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    margin: 10
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});
