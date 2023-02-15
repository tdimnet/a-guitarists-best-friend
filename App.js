import React, { createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/Home";
import SettingsScreen from "./src/screens/Settings";

const ThemeContext = createContext(null)
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <ThemeContext.Provider value="light">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  )
}


