import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function ImagePicker1({ onImagePicked }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
        const selectedImageUri = result.assets[0].uri;
        onImagePicked(selectedImageUri);    }
  };
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const takenPhotoUri = result.assets[0].uri;
      onImagePicked(takenPhotoUri);
    }
  };
  return <View style={styles.buttonContainer}>
  <Button title="image" onPress={pickImage} />
  <Button title="photo" onPress={takePhoto} />
</View>  

}
const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    margin: 10,
    },
  });
export default ImagePicker1;
