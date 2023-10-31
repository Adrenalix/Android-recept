import React, { useEffect, useState, useContext, useCallback  } from 'react';
import { View, Text, TouchableOpacity, Modal, Keyboard ,
   TextInput, TouchableWithoutFeedback, FlatList, StyleSheet, ImageBackground,
    Button, Image } from 'react-native';
import ImagePicker1 from './ImagePicker';
import { storeData, getData } from './storage';
import { useStorage } from './dataContext';
import { Detail } from './detailspage';
import { v4 as uuidv4 } from 'uuid';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';


function Item({ item, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.itemContainer}>
      <View style={styles.card}>
        <ImageBackground 
          source={{ uri: item.image }} 
          style={styles.image}
          imageStyle={{ borderRadius: 10 }}>
            {item.isFavorite && (
            <View style={styles.iconContainer}>
              <Icon  // black star icon behind
                  name="star"
                  size={36}  // Adjust the size as needed, making it slightly larger
                  color="black"  // Set color to black
                  style={styles.behindStarIcon}  // New style for positioning
              />

              <Icon  //  yellow star
                  name="star"
                  size={30}
                  color="yellow"
                  style={styles.starIcon}
              />
          </View>
          )}
        </ImageBackground>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
      </View>
    </TouchableOpacity>
  );
}

function Main({ navigation }) {
    const {items, setItems } = useStorage();
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
    
    const loadItems = async () => {
      const savedItems = await getData('items');
      if (savedItems) {
        setItems(savedItems);
      }else {
        console.log('No items found');
      }      
    };  
    
  useFocusEffect(useCallback(()=>{
    loadItems();
  },  []));

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
        isFavorite: false,
    };
    const updatedItems = [...(Array.isArray(items) ? items : []), newItem];
    await storeData('items', updatedItems); 
  
  setItems(updatedItems);
    setModalVisible(false);
    setNewItemName('');
    setNewItemLink('');
    setNewItemImage('');
  };
  
  const sortedItems = items.sort((a, b) => b.isFavorite - a.isFavorite);

function AddFoodButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.addFoodButton}
    >
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
}
function LeftIconButton({ onPress, icon }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.leftIconButton}
    >
      {icon ? icon : <Text style={styles.buttonText}>Icon</Text>}
    </TouchableOpacity>
  );
}
  
  return (
    <View style={styles.container}>
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
                        <Text style={styles.buttonText}>Add Item</Text>
                    </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      <FlatList
        data={sortedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item item={item} onPress={() => handlePress(item)} />}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.addFoodButton}>
        <Text style={styles.addFoodButtonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Ingredients', { items })} style={styles.leftIconButton}>
        <Icon name="search" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
iconContainer: {
  position: 'absolute',
  top: 10, 
  right: 10,
},
behindStarIcon: {
  top: -2.5,
  right: 2.5,
},
starIcon: {
  position: 'absolute',
},
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
addFoodButtonText: {
  color: 'white',
  fontSize: 60,
  textAlign: 'center',
  lineHeight: 65,
},
addFoodButton: {
  position: 'absolute',
  bottom: 20,
  right: 20,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: 'green',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
  shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
  },
  shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
},
leftIconButton: {
  position: 'absolute',
  bottom: 20,
  left: 20,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: 'orange',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.30,
  shadowRadius: 4.65,
  elevation: 8,
},
container: {
  flex: 1,
},
listContainer: {
  padding: 10,
},
titleContainer: {
  borderColor: '#000',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'white',
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
  height: 180,
},
title: {
  fontSize: 16,
  marginBottom:5,
  color: 'black',
  textAlign: 'center',
},
image: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
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
