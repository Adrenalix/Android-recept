import React, { useEffect } from 'react';
import Main from "./components/mainpage.js";
import Detail from "./components/detailspage.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View,StyleSheet } from "react-native";

//obj stack helps to navigate
const Stack = createNativeStackNavigator();

export default function App() {
  
return (
  
  <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerTitleAlign:'center',
      headerStyle:{
        backgroundColor: "red",
        
      },
      headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

    }}>
      <Stack.Screen name="Home" component={Main} options={{title:"Welcome to Food nite"}}/>
      <Stack.Screen name="Details" component={Detail} options={{title:"Food details"}}/>  

    </Stack.Navigator>
  </NavigationContainer>
 
)
}
