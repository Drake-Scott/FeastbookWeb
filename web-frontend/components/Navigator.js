import React, {useState, createRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import feastbook from '../assets/feastbook.png';

import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import HomeScreen from './HomeScreen'
import EmailConfirmation from './EmailConfirmation';

const Stack = createStackNavigator();

const Navigator = ({userToken, setUserToken}) => {

    // If no user is logged in, display only appropriate screens
    if(userToken === null)
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
              {/* <Stack.Screen
                name="FeastBook - ConfirmEmail"
                component={EmailConfirmation} 
                options={{headerShown: false}}
              /> */}
            </Stack.Navigator>
        );
    }
    else 
    return (
        <Stack.Navigator initialRouteName='HomeScreen'>
            <Stack.Screen
                name="FeastBook - Home"
                options={{headerShown: false}}>
              {(props) => <HomeScreen {...props} userToken={userToken} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default Navigator