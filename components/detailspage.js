import React, { useState, useContext } from "react";
import { View, Modal, Text, Button, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { DataContext } from "./dataContext";
import * as ImagePicker from 'expo-image-picker';




export default function Detail({ route, navigation }) {
    const {item } = route.params;
    const [items, setItems] = useState([]);
    // const {setItem, items, setItems } = useContext(DataContext);  // Use useContext to access setItems
    const {handleUpdateItem, handleDeleteItem } = useContext(DataContext);
    const [imageUri, setImageUri] = useState(item.image);
    const [modalVisible, setModalVisible] = useState(false);

    const [updatedName, setUpdatedName] = useState(item ? item.name : '');
    const [updatedLink, setUpdatedLink] = useState(item ? item.link : '');

    // when update button in details page is pressed
    const onUpdate = async() => {
      const updatedItem = { ...item, name: updatedName, link: updatedLink, image: imageUri };
      await handleUpdateItem(updatedItem);
         navigation.replace('Details', { item: updatedItem });      
     };

    const onDelete = async () => {
       console.log('Deleting item with id:', item.id);
      try {
          await handleDeleteItem(item.id);
          navigation.navigate('Home');
      } catch (error) {
          console.error('Error deleting item:', error);
      }
  };

    const handleImage = async (uri) => {
        const updatedItem = { ...item, image: uri }; 
        await handleUpdateItem(updatedItem);  
        setModalVisible(false);  
        navigation.replace('Details', { item: updatedItem });
      };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;
            handleImage(selectedImageUri);
          }
        // if (!result.canceled) {
        //      setImageUri(result.assets[0].uri);
        //      const updatedItem = { ...item, image: result.assets[0].uri };
        //      handleUpdateItem(updatedItem);
        //  }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          const takenPhotoUri = result.assets[0].uri;
          handleImage(takenPhotoUri);
        }
      };

    return (
        <View style={styles.container}>
           <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Image
          style={styles.image}
           source={{ uri: item.image }}
      />
    </TouchableOpacity>
    {modalVisible && (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Select an option</Text>
            <TouchableOpacity onPress={takePhoto}>
              <Text style={{ fontSize: 18, marginBottom: 20 }}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage}>
              <Text style={{ fontSize: 18, marginBottom: 20 }}>Choose from Library</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ fontSize: 18, color: 'red' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
                )}


        <TextInput
            style={styles.input}
            value={updatedName}
            onChangeText={setUpdatedName}
            placeholder="Enter name"
        />
        <TextInput
            style={styles.input}
            value={updatedLink}
            onChangeText={setUpdatedLink}
            placeholder="Enter link"
        />   
        <View style={styles.buttonContainer}>
            <Button title="Update" onPress={onUpdate} />
            <Button title="Delete" onPress={onDelete} color='red' />
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 16,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    link: {
        fontSize: 16,
        marginBottom: 16,
        color: 'blue',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
});

