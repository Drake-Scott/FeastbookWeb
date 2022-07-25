import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import React, {useState, createRef} from 'react';

import LoginScreen from './web-frontend/components/LoginScreen'
import RegisterScreen from './web-frontend/components/RegisterScreen'
import HomeScreen from './web-frontend/components/HomeScreen'
import AddPost from './web-frontend/components/AddPost';
import Profile from './web-frontend/components/Profile';
import LikedPosts from './web-frontend/components/LikedPosts';
import Visiting from './web-frontend/components/Visiting';
import RegisterSuccess from './web-frontend/components/RegisterSuccess';


const Stack = createStackNavigator();
// const validationToken = '_TOKEN_VARIABLE_';

// const config = {
//   screens: {
//     RegisterSuccess: 'hello',
//     Login: 'login',
//     Register: 'register',
//   },
// };

// const linking = {
//   prefixes: ['https://feastbook.herokuapp.com'],
//   config,
// };

// const state = {
//   type: 'stack',
//   key: 'stack-1',
//   routeNames: ['Login', 'Register', 'RegisterSuccess'],
//   routes: [
//     { key: 'login', name: 'Login'},
//     { key: 'register', name: 'Register' },
//     { key: 'RegisterSuccess', name: 'RegisterSuccess', params: { token: validationToken } },
//   ],
//     index: 1,
//     stale: false
// };


const Auth = () => {


  const[userToken, setUserToken] = useState(null); 
  // const[userToken, setUserToken] = useState({id:"62c4ea70c3fe9324a69e9ea3",firstname:"Tuo",lastname:"Contramaestre",error:""}); 
  // const[visitToken, setVisitToken] = useState({id:"62c4ea70c3fe9324a69e9ea3",firstname:"Tuo",lastname:"Contramaestre",error:"",username:'Tuo'});
  const[visitToken, setVisitToken] = useState(null);
  const[likedPosts, setLikedPosts] = useState([]);
  const [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontserratSB: require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });

  console.log(parsed);

  if (!loaded) {
    return null;
  }    

  if(userToken === null)
  {
    return (
      <Stack.Navigator> 
        <Stack.Screen
          name="RegisterSuccess"
          component={RegisterSuccess}
          options={{headerShown: false}}
        />  
        <Stack.Screen
          name="Login"
          // component={LoginScreen}
          options={{headerShown: false}}>
          {(props) => <LoginScreen {...props} setReturnToken={setUserToken} 
          setLikedPosts={setLikedPosts}/>}
        </Stack.Screen>
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator> 
    );
  }
  else 
  {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}>
          {(props) => <HomeScreen {...props} userToken={userToken} setUserToken={setUserToken}
          setVisitToken={setVisitToken} likedPosts={likedPosts} setLikedPosts={setLikedPosts}/>}
        </Stack.Screen>
        <Stack.Screen
          name='FeastBook - Profile' 
          options={{headerShown: false}}>
          {(props) => <Profile {...props} userToken={userToken} setUserToken={setUserToken}
          setVisitToken={setVisitToken}/>}
        </Stack.Screen>
        <Stack.Screen
          name='FeastBook - Add Post'
          options={{headerShown: false}}>
          {(props) => <AddPost {...props} userToken={userToken}setUserToken={setUserToken}
          setVisitToken={setVisitToken}/>}
        </Stack.Screen>
        <Stack.Screen
          name='FeastBook - Likes'
          options={{headerShown: false}}>
          {(props) => <LikedPosts {...props} userToken={userToken} setUserToken={setUserToken}
          setVisitToken={setVisitToken} likedPosts={likedPosts} setLikedPosts={setLikedPosts}/>}
        </Stack.Screen>
        <Stack.Screen
          name='FeastBook - Visiting' 
          options={{headerShown: false}}>
          {(props) => <Visiting {...props} userToken={userToken} setUserToken={setUserToken} 
          visitToken={visitToken} setVisitToken={setVisitToken} likedPosts={likedPosts}
          setLikedPosts={setLikedPosts}/>}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

};

const App = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

