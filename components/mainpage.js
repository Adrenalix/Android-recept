import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const data = [
  { id: '1', name: 'Item 1', link: 'https://example.com/1', image: 'https://example.com/img1.jpg' },
  { id: '2', name: 'Item 2', link: 'https://example.com/2', image: 'https://example.com/img2.jpg' },
];

function Item({ item, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View>
        <Text>{item.name}</Text>
        {/* Optionally render image: 
        <Image source={{ uri: item.image }} /> */}
      </View>
    </TouchableOpacity>
  );
}

function Main({ navigation }) {
    const [items, setItems] = useState([]);

  const handlePress = (item) => {
    navigation.navigate('Details', { item });
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Item item={item} onPress={handlePress} />}
    />
  );
}

export default Main;
