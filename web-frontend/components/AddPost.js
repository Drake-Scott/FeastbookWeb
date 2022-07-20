import React, {useState, createRef} from 'react';
import '../assets/css/AddPost.css'
import addPost from '../assets/addPost.png'
import Topbar from './Topbar';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Keyboard,
    TouchableOpacity,
    SafeAreaView,
    Image,
    ScrollView,
  } from 'react-native';

const AddPost = ({navigation, userToken}) => {
    console.log('in AddPost: usertoken = ' + JSON.stringify(userToken));

  return (
    <>
        <Topbar navigation={navigation} 
                screenSelected={2}/>
        <div className='postContainer'>
            <div className='imageBox'>
                <img src={addPost} className='postImage'/>
            </div>
            <div className='detailsContainer'>
                <input placeholder='Dish Name' className='dishName'></input>
                <div className='detailsInputs'>
                    <div className='ingredientsContainer'>
                        <input placeholder='Ingredient' className='ingredientInput'></input>
                        <input placeholder='Ingredient' className='ingredientInput'></input>
                        <br /><button className='addNewIng'>Add Ingredient</button>
                    </div>
                    <div className='directionsContainer'>
                        <input placeholder='Direction' className='directionInput'></input>
                        <br /><button className='addNewDir'>Add Direction</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddPost