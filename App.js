import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import React, {useState, createRef} from 'react';
import feastbook from './web-frontend/assets/feastbook.png';

import LoginScreen from './web-frontend/components/LoginScreen'
import RegisterScreen from './web-frontend/components/RegisterScreen'
import HomeScreen from './web-frontend/components/HomeScreen'
import Navigator from './web-frontend/components/Navigator'

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

  return (
    <Navigator userToken={userToken} setUserToken={setUserToken}/>
  );
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
