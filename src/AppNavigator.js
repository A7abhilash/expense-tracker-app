import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AppHeader from "./containers/AppHeader";
import Home from "./Home";

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => {
      return {
        headerTitle: () => <AppHeader />,
        headerStyle: {
          backgroundColor: "darkslateblue",
        },
      };
    },
  },
});

export default createAppContainer(AppNavigator);
