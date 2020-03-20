import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import action from "../action";

class TrendingPage extends Component {
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
          onPress={() => this.props.onThemeChange("orange")}
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

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(action.onThemeChange(theme))
});

export default connect(null, mapDispatchToProps)(TrendingPage);
