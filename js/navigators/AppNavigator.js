import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import WelcomePage from "../pages/WelcomePage";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import FetchDemoPage from "../pages/FetchDemoPage";
import AsyncStorageDemoPage from "../pages/AsyncStorageDemoPage";
import DataStoreDemoPage from "../pages/DataStoreDemoPage";

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null
    }
  }
});

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null
    }
  },
  DetailPage: {
    screen: DetailPage
  },
  FetchDemoPage: {
    screen: FetchDemoPage
  },
  AsyncStorageDemoPage: {
    screen: AsyncStorageDemoPage
  },
  DataStoreDemoPage: {
    screen: DataStoreDemoPage
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Init: InitNavigator,
      Main: MainNavigator
    },
    {
      navigationOptions: {
        header: null
      }
    }
  )
);
