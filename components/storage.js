import AsyncStorage from '@react-native-async-storage/async-storage';


 export const storeData = async (items, updatedItems) => {
   try {
     await AsyncStorage.setItem(items, JSON.stringify(updatedItems));
   } catch (e) {
     console.error("Error storing data", e);
   }
 }

 export const getData = async (items) => {
   try {
     const jsonValue = await AsyncStorage.getItem(items);
     return jsonValue != null ? JSON.parse(jsonValue) : null;
   } catch(e) {
     console.error("Error reading data", e);
   }
 }
