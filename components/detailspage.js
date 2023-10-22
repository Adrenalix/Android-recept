import React, { useState, useContext, useRef } from "react";
import { View, Text, Button, Image, StyleSheet, TextInput, TouchableWithoutFeedback } from "react-native";
import { DataContext } from "./dataContext";
import * as ImagePicker from 'expo-image-picker';
import ActionSheet from 'react-native-actionsheet';



export default function Detail({ route, navigation }) {
    const { item } = route.params;
    const {  setItem, items, setItems } = useContext(DataContext);  // Use useContext to access setItems
    const { handleUpdateItem, handleDeleteItem } = useContext(DataContext);
    const [imageUri, setImageUri] = useState(item.image);

    const [updatedName, setUpdatedName] = useState(item ? item.name : '');
    const [updatedLink, setUpdatedLink] = useState(item ? item.link : '');

    const onUpdate = () => {
        const updatedItem = { ...item, name: updatedName, link: updatedLink, image: imageUri };
        handleUpdateItem(updatedItem);
        navigation.replace('Details', { item: updatedItem });
    };

    const onDelete = () => {
        handleDeleteItem(item.id);
        navigation.navigate('Home');
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            const updatedItem = { ...item, image: result.assets[0].uri };
            handleUpdateItem(updatedItem);
        }
    };

    const actionSheetRef = useRef(null);

    const showActionSheet = () => {
    actionSheetRef.current.show();
    };

    const handlePress = (index) => {
    switch (index) {
        case 0:
        // Trigger function to open camera
        break;
        case 1:
        // Trigger function to open image library
        break;
        default:
        break;
    }
    };


    return (
        <View style={styles.container}>
            {/* {imageUri ? (
                <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
            ) : null}
            <Button title="Pick an image" onPress={pickImage} /> */}

            <TouchableWithoutFeedback onPress={showActionSheet}>
            <Image
                style={styles.image}
                source={{ uri: item.image }}
            />
            </TouchableWithoutFeedback>
            <ActionSheet
            ref={actionSheetRef}
            options={['Take Photo', 'Choose from Library', 'Cancel']}
            cancelButtonIndex={2}
            onPress={handlePress}
            />

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

