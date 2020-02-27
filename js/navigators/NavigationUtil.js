export default class NavigationUtil {
  /**
   * navigate to different page
   * params the parameters that you want to pass
   * page the destination you want to go
   */
  static goPage(params, page) {
    const navigation = NavigationUtil.navigation;
    if (!navigation) {
      console.log("NavigationUtil.navigation can not be null");
    }
    navigation.navigate(
        page,
        {
            ...params
        }
    )
  }

  static resetToHomePage(params) {
    const { navigation } = params;
    navigation.navigate("Main");
  }
}