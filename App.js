import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import React, {useState, createRef} from 'react';

import LoginScreen from './web-frontend/components/LoginScreen'
import RegisterScreen from './web-frontend/components/RegisterScreen'
import HomeScreen from './web-frontend/components/HomeScreen'
import EmailConfirmation from './web-frontend/components/EmailConfirmation';
import AddPost from './web-frontend/components/AddPost';
import Profile from './web-frontend/components/Profile';


const Stack = createStackNavigator();

// if userToken is null, assume user is logged out.
// var userToken = null;

const Auth = () => {
  const[userToken, setUserToken] = useState(null);
  const [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontserratSB: require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  if(userToken != null)
  {
    return (
        <Stack.Navigator initialRouteName='LoginScreen'>              
          <Stack.Screen
            name="FeastBook - Login"
            // component={LoginScreen}
            options={{headerShown: false}}>
            {(props) => <LoginScreen {...props} setReturnToken={setUserToken} />}
          </Stack.Screen>
          <Stack.Screen
            name="FeastBook - Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FeastBook - ConfirmEmail"
            component={EmailConfirmation} 
            options={{headerShown: false}}
          />
        </Stack.Navigator> 
    );
  }
  else 
  {
    return (
        // <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Navigator>
          <Stack.Screen
              name="FeastBook - Home"
              options={{headerShown: false}}>
              {(props) => <HomeScreen {...props} userToken={userToken} />}
          </Stack.Screen>
          <Stack.Screen
              name='FeastBook - Add Post'
              options={{headerShown: false}}>
              {(props) => <AddPost {...props} userToken={userToken} />}
          </Stack.Screen>
          <Stack.Screen
              name='FeastBook - Profile' 
              options={{headerShown: false}}>
              {(props) => <Profile {...props} userToken={userToken} />}
          </Stack.Screen>
        </Stack.Navigator>
    );
  }

};

const App = () => {
  return (
    <NavigationContainer>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
