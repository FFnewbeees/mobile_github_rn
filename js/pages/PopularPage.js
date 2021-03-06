/** @format */

import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import PopularItem from "../common/PopularItem";

import { connect } from "react-redux";
import actions from "../action/index";

const URL = "https://api.github.com/search/repositories?q=";
const QUERY_STR = "&sort=stars";

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.tabNames = [
      "Java",
      "Android",
      "iOS",
      "React",
      "React Native",
      "Python",
    ];
  }

  _genTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: (props) => <PopularTabPage {...props} tabLabel={{ item }} />,
        navigationOptions: {
          title: item,
        },
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
            backgroundColor: "purple",
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle,
        },
      })
    );

    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TabNavigator />
      </View>
    );
  }
}

class PopularTab extends Component {
  constructor(props) {
    super(props);
    const { tabLabel } = this.props;
    this.storeName = tabLabel;
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { onLoadPopularData } = this.props;
    const url = this.genFetchUrl(this.storeName);
    onLoadPopularData(this.storeName, url);
  }

  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }

  renderItem(data) {
    const item = data.item;

    return <PopularItem item={item} onSelect={() => {}} />;
  }

  render() {
    const { popular } = this.props;
    let store = popular[this.storeName]; //dynamic state
    if (!store) {
      store = {
        items: [],
        isLoading: false,
      };
    }

    return (
      <View>
        <FlatList
          data={store.items}
          renderItem={(data) => this.renderItem(data)}
          keyExtractor={(item) => "" + item.id}
          refreshControl={
            <RefreshControl
              title={"Loading"}
              titleColor={"red"}
              colors={["red"]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={"blue"}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  popular: state.popular,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadPopularData: (storeName, url) =>
    dispatch(actions.onLoadPopularData(storeName, url)),
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  tabStyle: {
    minWidth: 50,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: "white",
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6,
  },
});
