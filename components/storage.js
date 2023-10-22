import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (items, value) => {
  try {
    await AsyncStorage.setItem(items, JSON.stringify(value));
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


// export const handleUpdateItem = async (updatedItem) => {
//   try {
//     const existingItems = await getData('@items');
//     const updatedItems = existingItems.map(item =>
//       item.id === updatedItem.id ? updatedItem : item
//     );
//     await storeData('@items', updatedItems);
//   } catch (e) {
//     console.error("Error updating data", e);
//   }
// };

// export const handleDeleteItem = async (itemId) => {
//   try {
//     const existingItems = await getData('@items');
//     const updatedItems = existingItems.filter(item => item.id !== itemId);
//     await storeData('@items', updatedItems);
//   } catch (e) {
//     console.error("Error deleting data", e);
//   }
// };