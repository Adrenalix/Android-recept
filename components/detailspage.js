import React from "react";
import { View, Text, Button,Image } from "react-native";

function Detail({route,navigation}) {
    // const {book} =route.params
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>








            {/* <Text>Detail page!</Text>
            <Button title="Go to Main page" onPress={()=>navigation.navigate('Home')}/>
            <Text>{book.Title}</Text>
            <Text>ISBN {book.ISBN}</Text>
            <Text>Shelf {book.Shelf.Name}</Text>
            {book.Authors.map(function(author){
                return(
                    <Text key={author.Id}>{author.FirstName} {author.LastName}</Text>
                )
            })}
            <Image source={{uri:book.ImageLink}} style={{width:250,height:250, marginTop:50}}/> */}

        </View>
    )
}
export default Detail;