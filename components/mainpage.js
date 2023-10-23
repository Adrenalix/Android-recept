import React, { useEffect, useState, useContext  } from 'react';
import { View, Text, TouchableOpacity, Modal, Keyboard , TextInput, TouchableWithoutFeedback, FlatList, StyleSheet, Image, ImageBackground, Button } from 'react-native';
import ImagePicker1 from './ImagePicker';
import { storeData, getData } from './storage';
import { DataContext } from './dataContext';
import { Detail } from './detailspage';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Item({ item, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.itemContainer}>
      <View style={styles.card}>
      <ImageBackground 
          source={{ uri: item.image }} 
          style={styles.image}
          imageStyle={{ borderRadius: 10 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}



function Main({ navigation }) {
    // const [items, setItems] = useState([]);
    const { items, setItems, handleUpdateItem, handleDeleteItem } = useContext(DataContext);
    const [isModalVisible, setModalVisible] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [newItemLink, setNewItemLink] = useState('');
    const [newItemImage, setNewItemImage] = useState(null);
    
    const handleImagePicked = (uri) => {
      setNewItemImage(uri);
    };

    function handlePress (item) {
      navigation.navigate('Details', { item });
    }
    
  useEffect(() => {
    const loadItems = async () => {
      const savedItems = await getData('@items');
      if (savedItems) {
        setItems(savedItems);
      }else {
        console.log('No items found');
      }
    };  
    loadItems();
  },  []);

  const handleAddItem = async () => {
    if (newItemName.trim() === '') {
      alert('Please enter a name for the item.');
      return;
  }
    const newItem = {
        id: uuidv4(),
        name: newItemName,
        link: newItemLink ? newItemLink : null,
        image: newItemImage ? newItemImage : null,
    };
    
  const updatedItems = [...items, newItem];
  await storeData('@items', updatedItems);  // Store the updated items list in local storage
  
  setItems(updatedItems);
    setModalVisible(false);
    setNewItemName('');
    setNewItemLink('');
    setNewItemImage('');
};
  
  return (
    <View style={styles.container}>
      <Button title="Add Food" onPress={() => setModalVisible(true)} />
      <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}>

            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.centeredView}>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter food name"
                        value={newItemName}
                        onChangeText={setNewItemName}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter food link"
                        value={newItemLink}
                        onChangeText={setNewItemLink}
                    />        
                      <ImagePicker1 onImagePicked={handleImagePicked} />
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                        <Text style={styles.addButtonText}>Add Item</Text>
                    </TouchableOpacity>
                </View>
                </TouchableWithoutFeedback>

              </View>

              </TouchableWithoutFeedback>

          </Modal>
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Item item={item} onPress={() => handlePress(item)} />}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
    />
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
},
textInput: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
},
addButtonText: {
    color: 'white',
},
  listContainer: {
    padding: 10,
  },
  titleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: '#000',
    width: '100%', 
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
    alignSelf: 'center', 
  },
  itemContainer: {
    flex: 1,
    padding: 5,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 0,
    elevation: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    marginBottom:5,
    color: 'black',
    textAlign: 'center',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    flex: 1,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
},
cancelButton: {
  backgroundColor: '#ccc',  
  padding: 10,
  borderRadius: 5,
  width: '45%',  
  alignItems: 'center',
  margin: 5,
},
addButton: {
  backgroundColor: '#28a745', 
  padding: 10,
  borderRadius: 5,
  width: '45%',  
  alignItems: 'center',
  margin: 10, 
},
buttonText: {
    color: 'white',
    fontWeight: 'bold',
},
});

export default Main;
