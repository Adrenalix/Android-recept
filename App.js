import React from 'react';
import Main from "./components/mainpage.js";
import Detail from "./components/detailspage.js";
import Ingredients from './components/ingredients.js';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DataProvider } from './components/dataContext.js';
import { Image, StyleSheet, StatusBar, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

const HeaderTitleImage = ({ screenName }) => {
const marginLeftValue = screenName === 'SpecialView' ? -150 : -25;

  return (
    <View style={{ flex: 1,  alignItems: 'center', justifyContent: 'center', width: '100%', marginLeft: marginLeftValue}}>
      <Image
        source={require('./img/Food.png')}
        style={{ width: '120%', height: 120 }} 
        resizeMode="cover"
      />      
      <Text style={styles.titleText}>MealKeeper</Text>
    </View>
  );
};

export default function App() {
return (
  <DataProvider>
    <NavigationContainer>
      <StatusBar hidden={true} />
        <Stack.Navigator >
        <Stack.Screen name="Home" component={Main} options={{
          headerTitle: props => <HeaderTitleImage {...props} />,  
        }}/>
        <Stack.Screen name="Details" component={Detail} options={{
          headerTitle: props => <HeaderTitleImage {...props} screenName="SpecialView" />,  
          }}/>  
          <Stack.Screen name="Ingredients" component={Ingredients } options={{
          headerTitle: props => <HeaderTitleImage {...props} screenName="SpecialView" />,  
          }}/> 
      </Stack.Navigator>
    </NavigationContainer>
  </DataProvider>
)}

const styles = StyleSheet.create({
  titleText: {
    position: 'absolute',
    color: 'orange', 
    fontSize: 50, 
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3,
  }
});