import React, { createContext, useState, useEffect } from 'react';
import { storeData, getData } from './storage';


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadData = async () => {
          const loadedData = await getData('items');
          if (loadedData) {
            setItems(loadedData);
          }
        };
        loadData();
      }, []);
    
//   const handleUpdateItem = (updatedItem) => {
//     setItems(prevItems => prevItems.map(item => item.id === updatedItem.id ? updatedItem : item));
//   };

const handleUpdateItem = async (updatedItem) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      );
      storeData('items', updatedItems);  // Saves updated items to AsyncStorage
      return updatedItems;
    });
  };

//   const handleDeleteItem = (id) => {
//     setItems(prevItems => prevItems.filter(item => item.id !== id));
//   };

const handleDeleteItem = async (id) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      storeData('items', updatedItems);  // Saves updated items to AsyncStorage
      return updatedItems;
    });
  };

  return (
    <DataContext.Provider value={{item, setItem, items, setItems, handleUpdateItem, handleDeleteItem }}>
      {children}
    </DataContext.Provider>
  );
};
