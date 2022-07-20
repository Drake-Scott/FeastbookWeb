import React, {useState, createRef} from 'react';
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

const EmailConfirmation = ({navigation}) => {

  function handleRedirect()
  {
    navigation.navigate('FeastBook - Login');
  }

  return (
    <View style={styles.confirmationWrapper}>
      <View style={styles.upperHalf}>
        <Text style={styles.thankText}> Thank you for registering! </Text>
        <Text style={styles.thankSubtext}> Follow the instructions in your email to begin sharing and viewing recipes. </Text>
      </View>
      <View style={styles.lowerHalf}>
        <Text style={styles.readyPrompt}> Already confirmed your email?</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleRedirect}>
          <Text style={styles.buttonTextStyle}>Click here to log in!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EmailConfirmation;

const styles = StyleSheet.create({

  confirmationWrapper: {
    width: '50%',
    height: '80%',
    borderRadius: '8%',
    backgroundColor: '#1B262C',
    zIndex: 10,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  upperHalf: {
    marginTop: '10%',
    alignItems: 'center',
    height: '50%',
  },

  thankText: {
    fontFamily: 'Montserrat',
    position: 'relative',
    color: 'white',
    fontSize: '400%',
    marginBottom: '6%',
  },

  thankSubtext: {
    fontFamily: 'Montserrat',
    position: 'relative',
    color: 'white',
    alignSelf: 'center',
  },

  lowerHalf: {
    
  },

  readyPrompt: {
    fontFamily: 'Montserrat',
    position: 'relative',
    color: 'white',
    alignSelf: 'center',
  },  

  buttonStyle: {
    width: '65%',
    alignSelf: 'center',
    backgroundColor: "#0F4C75",
    height: 30,
    borderRadius: 10,
  },

  buttonTextStyle: {
    width: '40%',
    height: '20%',
    fontFamily: 'Montserrat',
    color: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 18,
    marginTop:4,
  },

});