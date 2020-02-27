import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import NavigationUtil from "../navigators/NavigationUtil";

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.tabNames = [
      "JAVA",
      "ANDROID",
      "IOS",
      "REACT",
      "REACT NATIVE",
      "PYTHON"
    ];
  }

  _genTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTab {...props} tabLabel={{ item }} />,
        navigationOptions: {
          title: item
        }
      };
    });
    return tabs;
  }

  render() {
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(this._genTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,
          scrollEnabled: true,
          style: {
            backgroundColor: "purple"
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle
        }
      })
    );

    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TabNavigator />
        <Button
          title={"Change Theme"}
          onPress={() =>
            navigation.setParams({
              theme: {
                tintColor: "red",
                updateTime: new Date().getTime()
              }
            })
          }
        />
      </View>
    );
  }
}

class PopularTab extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>hello</Text>
        <Text
          onPress={() => {
            NavigationUtil.goPage({}, "DetailPage");
          }}
        >
          Jump to Detail Page
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  tabStyle: {
    minWidth: 50
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: "white"
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6
  }
});
