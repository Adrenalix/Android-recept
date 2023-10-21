import React, { useState } from "react";
import {launchCameraAsync} from "expo-image-picker"
import { View, Text ,Button ,StyleSheet, Image } from "react-native";

const ImageSelector=(props)=>{
    const[pickedImage,setPickedImage]=useState(null)
    const takeImageHandler=async()=>{
        const image = await launchCameraAsync();
        setPickedImage(image.assets[0].uri);
        // console.log(image.assets);   
}

    return(
        <View style={styles.imagepicker}>
            <View style={styles.imagepreview}>
                {!pickedImage ? <Text>No image picked</Text> :
                <Image source={{uri:pickedImage}} style={styles.image}/>
                }
            </View>
            <Button onPress={takeImageHandler} title="take image"/>
        </View>
    )
}
const styles=StyleSheet.create({
    
    imagepicker:{
        alignItems:"center"
    },
    imagepreview:{
        width:"100%",
        height:200,
        margin:10,
        justifyContent:"center",
        alignItems:"center"
    },
    image:{
        height:"100%",  
        width:"100%",
    }
})
export default ImageSelector;