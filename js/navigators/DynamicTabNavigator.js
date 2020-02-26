import PopularPage from "../pages/PopularPage";
import TrendingPage from "../pages/TrendingPage";
import MyPage from "../pages/MyPage";
import FavouritePage from "../pages/FavouritePage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { Component } from "react";

import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";

const TABS = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: "Popular",
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={"whatshot"}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: "Trending",
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={"trending-up"}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  FavouritePage: {
    screen: FavouritePage,
    navigationOptions: {
      tabBarLabel: "Favourite",
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={"favorite"}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons name={"people"} size={26} style={{ color: tintColor }} />
      )
    }
  }
};

export default class DynamicTabNavigator extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  _tabNavigator() {
    const { PopularPage, MyPage, FavouritePage, TrendingPage } = TABS;
    const tabs = { PopularPage, MyPage, FavouritePage, TrendingPage };
    //change tab's props dynamically
    PopularPage.navigationOptions.tabBarLabel = "Popular";
    return createAppContainer(
      createBottomTabNavigator(tabs, {
        tabBarComponent: TabBarComponent
      })
    );
  }

  render() {
    const Tab = this._tabNavigator();
    return <Tab />;
  }
}

class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime()
    };
  }

  render() {
    const { routes, index } = this.props.navigation.state;
    if (routes[index].params) {
      const { theme } = routes[index].params;
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme;
      }
    }

    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={this.theme.tintColor || this.props.activeTintColor}
      />
    );
  }
}
