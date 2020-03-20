import PopularPage from "../pages/PopularPage";
import TrendingPage from "../pages/TrendingPage";
import MyPage from "../pages/MyPage";
import FavouritePage from "../pages/FavouritePage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { Component } from "react";
import { connect } from "react-redux";

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

class DynamicTabNavigator extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  _tabNavigator() {
    if (this.Tabs) {
      return this.Tabs;
    }
    const { PopularPage, MyPage, FavouritePage, TrendingPage } = TABS;
    const tabs = { PopularPage, MyPage, FavouritePage, TrendingPage };
    //change tab's props dynamically
    PopularPage.navigationOptions.tabBarLabel = "Popular";
    return (this.Tabs = createAppContainer(
      createBottomTabNavigator(tabs, {
        tabBarComponent: props => {
          return <TabBarComponent theme={this.props.theme} {...props} />;
        }
      })
    ));
  }

  render() {
    const Tab = this._tabNavigator();
    return <Tab />;
  }
}

class TabBarComponent extends Component {
  render() {
    return <BottomTabBar {...this.props} activeTintColor={this.props.theme} />;
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme
});

export default connect(mapStateToProps)(DynamicTabNavigator);
