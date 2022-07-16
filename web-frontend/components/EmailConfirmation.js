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

const EmailConfirmation = ({navigation, showModal, setShowModal}) => {

  function handleModalClick()
  {
    setShowModal(prev => !prev);
    // navigation.navigate('FeastBook - Login');
  }

  return (
    <View style={styles.ModalWrapper}>
      <View style={{alignItems: 'center',
                    }}>
        <Text style={styles.ModalThank}> Thank you for registering! </Text>
        <Text style={{color:'white',}}> Follow the instructions in your email to begin sharing and viewing recipes. </Text>
      </View>
        <Text> Ready to log in?</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleModalClick}>
          <Text style={styles.buttonTextStyle}>Click here to log in!</Text>
        </TouchableOpacity>
    </View>
  )
}

export default EmailConfirmation;

const styles = StyleSheet.create({
  Background: {
    width: '100%',
    height: '100%',
    position: "fixed",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  ModalThank: {
    paddingTop: '-100%',
    color: 'white',
    position: 'relative',
    top: '-20%',
    fontSize: '400%',
  },

  ModalWrapper: {
    display: 'flex',
    width: '50%',
    height: '80%',
    backgroundColor: '#1B262C',
    zIndex: 10,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 18,
    marginTop:4,
  },

});

