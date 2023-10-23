import React, { createContext, useState, useEffect } from 'react';
import { storeData, getData } from './storage';


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadData = async () => {
          const loadedData = await getData('@items');
          if (loadedData) {
            setItems(loadedData);
          }
        };
        loadData();
    }, []);

    const handleUpdateItem = async (updatedItem) => {
      const updatedItems = items.map(item => 
        item.id === updatedItem.id ? updatedItem : item
    );
      await storeData('@items', updatedItems);
      setItems(updatedItems);

  };






  const handleDeleteItem = async (id) => {
    try {
        console.log('first id', id)
        const updatedItems = items.filter(item => item.id != id);

        updatedItems.forEach(item => console.log(item.id));

        // Update stored data
        await storeData('items', updatedItems);
        // Update local state
        setItems(updatedItems);

        console.log('Item deleted successfully');
      }

     catch (error) {
        console.error('Error deleting item:', error);
    }
};







// const handleDeleteItem = async (id) => {
//       console.log('Deleting item with id:', id);

//   try {
//       setItems(async prevItems => {
//           const updatedItems = prevItems.filter(item => item.id !== id);
//           console.log('Updated items:', updatedItems);

//           await storeData('items', updatedItems);  // Use await here
//           return updatedItems;
//       });
//   } catch (error) {
//       console.error("Error deleting item:", error);
//   }
// };


  return (
    <DataContext.Provider value={{item, setItem, items, setItems, handleUpdateItem, handleDeleteItem }}>
      {children}
    </DataContext.Provider>
  );
};
