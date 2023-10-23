import React from 'react';
import Main from "./components/mainpage.js";
import Detail from "./components/detailspage.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DataProvider } from './components/dataContext.js';
import { Image, View, StatusBar } from 'react-native';

//obj stack helps to navigate
const Stack = createNativeStackNavigator();

const HeaderTitleImage = () => {
  return (
    <View style={{ flex: 1,  alignItems: 'center', justifyContent: 'center', width: '100%'}}>
      <Image
        source={require('./img/Food.png')}
        style={{ width: '140%', height: 120 }} 
        resizeMode="cover"
      />
    </View>
  );
};

export default function App() {
return (
  <DataProvider>
    <NavigationContainer>
      <StatusBar hidden={true} />
        <Stack.Navigator screenOptions={{
          headerTitleContainerStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
        headerTitleAlign:'center',
        headerStyle:{
          height: 100,
          },
        headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Home" component={Main} options={{
          headerTitle: props => <HeaderTitleImage {...props} />,  
          title:"Welcome to Food nite"}}/>
        <Stack.Screen name="Details" component={Detail} options={{
          headerTitle: props => <HeaderTitleImage {...props} />,  
          title:"Food details"}}/>  
      </Stack.Navigator>
    </NavigationContainer>
  </DataProvider>
)}