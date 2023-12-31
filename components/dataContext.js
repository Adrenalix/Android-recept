import React, { createContext, useContext, useState, useEffect, useCallback  } from 'react';
import { getData, storeData } from './storage';

export const DataContext = createContext();

export const useStorage = () => {
  return useContext (DataContext)
}

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

    const handleUpdateItem = async (updatedItem) => {
      const updatedItems = items.map(item => 
        item.id === updatedItem.id ? updatedItem : item
    );
      await storeData('items', updatedItems);
      setItems(updatedItems);      
  };
  
  const handleDeleteItem = async (id) => {
    try {
        const updatedItems = items.filter(item => item.id != id);
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

  return (
    <DataContext.Provider value={{item, setItem, items, setItems, handleUpdateItem, handleDeleteItem }}>
      {children}
    </DataContext.Provider>
  );
};
