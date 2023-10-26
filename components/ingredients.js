import React, { useState } from 'react';
import { 
  View, TextInput, Button, FlatList,
   Text, StyleSheet, TouchableOpacity,
    ImageBackground, Linking   } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useStorage } from "./dataContext";
import { storeData, getData } from './storage.js';



const Ingredients = ({route, navigation }) => {
  // const {items, setItems } = useStorage();
  // const { items } = useContext(DataContext);
  const {items} = route.params;

  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [apiType, setApiType] = useState('byIngredients');

  const fetchRecipes = async () => {
    let url;
    if (apiType === 'byIngredients') {
      url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=100&apiKey=77a3a9882c8f4a0d8fce328d10427b8b`;
    } else {
       url = `https://api.spoonacular.com/recipes/search?query=${encodeURIComponent(ingredients)}&number=100&apiKey=77a3a9882c8f4a0d8fce328d10427b8b`;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Network response was not ok', response);
        return;
      }
      const data = await response.json();
      setRecipes(apiType === 'byIngredients' ? data : data.results);
      // console.log(recipes);  // Log the recipes data

    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
  const placeholderText = apiType === 'byIngredients' 
  ? "Enter ingredients, separated by commas" 
  : "Enter search query";

  const onImagePress =async (item) => {
    try {
      if (item.sourceUrl != null) {
        await Linking.openURL(item.sourceUrl);
      }
      else {       
        const url = `https://api.spoonacular.com/recipes/${item.id}/information?includeNutrition=false&apiKey=77a3a9882c8f4a0d8fce328d10427b8b`;
        const response = await fetch(url);
        const data = await response.json();
        const sourceUrl = data.sourceUrl;
        await Linking.openURL(sourceUrl);
      }
    }     
    catch (error) {
      console.log(item)
      console.error('Unable to open URL');
    }
  };







  const onPlusPress = async (item) => {
    const imageUrl = item.image.startsWith('https://spoonacular.com/recipeImages/') 
        ? item.image 
        : 'https://spoonacular.com/recipeImages/' + item.image;
    const newItem = {
      id: item.id,
      name: item.title,
      link: item.sourceUrl,
      image: imageUrl,
    };
    try {
      const updatedItems = [...(Array.isArray(items) ? items : []), newItem];
      await storeData('items', updatedItems);
      console.log('added',newItem)

    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };





  function Item({ item  }) {
    if (!item || !item.image) {
    return null;
  }
  const imageUrl = item.image.startsWith('https://spoonacular.com/recipeImages/') 
  ? item.image 
  : 'https://spoonacular.com/recipeImages/' + item.image;

    return (
      <TouchableOpacity onPress={() => onImagePress(item)} style={styles.itemContainer}>
      <View style={styles.card}>
        <ImageBackground 
            source={{ uri: imageUrl }} 
            style={styles.image}
            imageStyle={{ borderRadius: 10 }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </ImageBackground>
            <TouchableOpacity style={styles.plusButton} onPress={() => onPlusPress(item)}>
              <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
  const filteredRecipes = recipes.filter(recipe => !!recipe.image);


  return (
    <View style={styles.container}>
      <View style={styles.extraContainer}>
      <Picker
        style={styles.picker}
        selectedValue={apiType}
        onValueChange={(itemValue) => setApiType(itemValue)}
      >
        <Picker.Item label="Find recipe by ingredients" value="byIngredients" />
        <Picker.Item label="Search recipes" value="search" />
      </Picker>
      <TextInput
        style={styles.input}
        value={ingredients}
        onChangeText={setIngredients}
        placeholder={placeholderText}
      />
      <Button title="Search" onPress={fetchRecipes} />
      </View>
      <FlatList
      data={filteredRecipes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => 
      <Item item={item} onImagePress={() => handlePress(item)} onPlusPress={() => handlePlusPress(item)} />}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  extraContainer: {
    width: '100%',
    padding: 10,
  },    
  plusButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButtonText: {
    fontSize: 28,
    top: -6,
    color: 'black',
  },
  listContainer: {
    padding: 10,
  },
  picker: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
  itemContainer: {
     width: '50%',
    height: 150,
    padding: 5,
    marginTop: 10,   
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
    height: '100%',
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
  title: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    flex: 1,
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  });

export default Ingredients;
