import React, {useState, createRef} from 'react';
import feastbook from '../assets/feastbook.png';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import EmailConfirmation from './EmailConfirmation';


const LoginScreen = ({navigation}) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword1, setUserPassword1] = useState('');
    const [userPassword2, setUserPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [showModal, setShowModal] = useState(false);
    const passwordInputRef = createRef();

    // const handleModal = () => {
    //     console.debug("Called handleModal()");
    //     setShowModal(prev => !prev);
    // };

    const handleSubmitPress = () => {
        // handleModal();
        setErrortext('');
        if (!firstname) {
            alert('First name required');
            return;
        }
        if (!lastname) {
            alert('Last name required');
            return;
        }
        if (!username) {
            alert('Username required');
            return;
        }
        if (!userEmail) {
            alert('Email required');
            return;
        }
        if (!userPassword1) {
            alert('Password required');
            return;
        }
        if (userPassword1 !== userPassword2) {
            alert('Passwords must match');
            return;
        }
        setLoading(true);
        let dataToSend = {firstName: firstname, lastName: lastname, login: username, password: userPassword1, email: userEmail};
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        console.log(formBody);

        fetch('/api/register', {
            method: 'POST',
            body: formBody,
            headers: {
                'Content-Type':
                'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setLoading(false);
            console.log(responseJson);
            
            if (responseJson.status == 'success') {
                // navigation.navigate('FeastBook - ConfirmEmail');
            }
            else {
                setErrortext(responseJson.msg);
                // navigation.navigate('FeastBook - ConfirmEmail');
                console.log('Incorrect email and/or password');
            }
        })
        .catch((error) => {
            setLoading(false);
            console.error(error);
        });
    }

    return (
        <ScrollView style={{flex:1, backgroundColor: '#fff'}}>
            
            {showModal ? 
                <EmailConfirmation showModal={showModal} setShowModal={setShowModal}/> 
            : null}
            <View style = {styles.mainBody}>
                <View style={styles.header}>
                    <Text style={styles.heading}>FeastBook</Text>
                </View>

                <View>
                    <Text style={styles.sloganText}>Connect with friends and share your culinary creations with the world</Text>
                </View>

                <View style={{flexDirection:'row', flexWrap:'wrap', alignSelf:'center'}}>
                    <Image source={feastbook} style={{width: 300, height: 600}}/>
                    
                    <View style={{flexDirection: 'column', marginTop:30}}>
                        <View style={styles.tabs}>
                        <View style={styles.loginTab}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('FeastBook - Login')}>
                                <Text style={styles.loginTextStyle}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.registerTab}>
                            <Text style={styles.registerTextStyle}>Register</Text>
                        </View>
                    </View>
                    
                    <SafeAreaView style={styles.SafeAreaView}>
                            
                        <View style={styles.spacingSmall}></View>

                        <Text style={styles.loginPrompts}>First Name</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(firstname) => setFirstname(firstname)}
                            placeholder="First name"
                            returnKeyType="next"
                            onSubmitEditing={() => 
                                passwordInputRef.current && passwordInputRef.current.focus()
                            }
                        />

                        <Text style={styles.loginPrompts}>Last Name</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(lastname) => setLastname(lastname)}
                            placeholder="Last name"
                            returnKeyType="next"
                            onSubmitEditing={() => 
                                passwordInputRef.current && passwordInputRef.current.focus()
                            }
                        />
                    
                        <Text style={styles.loginPrompts}>Username</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(username) => setUsername(username)}
                            placeholder="Username"
                            returnKeyType="next"
                            onSubmitEditing={() => 
                                passwordInputRef.current && passwordInputRef.current.focus()
                            }
                        />
        
                        <Text style={styles.loginPrompts}>Email</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(userEmail) => setUserEmail(userEmail)}
                            placeholder="Email"
                            returnKeyType="next"
                            onSubmitEditing={() => 
                                passwordInputRef.current && passwordInputRef.current.focus()
                            }
                        />
        
                        <Text style={styles.loginPrompts}>Password</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(userPassword1) => setUserPassword1(userPassword1)}
                            placeholder="Password"
                            secureTextEntry={true}
                            returnKeyType="next"
                            onSubmitEditing={() => 
                                passwordInputRef.current && passwordInputRef.current.focus()
                            }
                        />
        
                        <Text style={styles.loginPrompts}>Re-enter Password</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(userPassword2) => setUserPassword2(userPassword2)}
                            placeholder="Password"
                            secureTextEntry={true}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                        />
                        
                            {errortext != '' ? (
                                <Text style={styles.errorTextStyle}>
                                    {errortext}
                                </Text>
                            ) : null}
        
                            <View style={styles.spacingSmall}></View>
        
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={handleSubmitPress}>
                                <Text style={styles.buttonTextStyle}>Register</Text>
                            </TouchableOpacity>
                            <View style={styles.spacingSmall}></View>
                        </SafeAreaView>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0F4C75',
    },
  
    heading: {
        margin: 10,
        alignSelf: 'center',
        color: '#BBE1FA',
        fontSize:32,
        fontWeight: '500',
        fontFamily: 'MontserratSB'
    },

    mainBody: {
        backgroundColor: '#fff',
        alignSelf: 'stretch'
    },

    SafeAreaView: {
        width: '75%',
        border: 'solid',
        borderRightWidth: 5,
        borderBottomWidth: 5,
        borderLeftWidth: 5,
        borderTopWidth: 0,
        borderTopColor: 'transparent',
        borderBottomColor: '#0F4C75',
        borderRightColor: '#0F4C75',
        borderLeftColor: '#0F4C75',
        borderBottomEndRadius: 30,
        borderBottomLeftRadius: 30,
        alignSelf: 'center',
        backgroundColor: '#1B262C',

    },

    loginPrompts: {
        fontFamily: 'Montserrat',
        paddingLeft: 20,
        color: '#fff',
        fontSize:16,
    },

    inputStyle: {
        fontFamily: 'Montserrat',
        backgroundColor: '#fff',
        height: 40,
        margin: 12,
        alignSelf: 'center',
        width: '95%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius:10,
        padding: 10,
    },

    errorTextStyle: {
    },

    tabs: {
        width: '75%',
        marginTop: 30,
        borderTopWidth: 5,
        borderTopColor: '#0F4C75',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        flexDirection:'row', 
        flexWrap:'wrap', 
        alignSelf: 'center',
        backgroundColor: '#1B262C'
    },

    loginTab: {
        width: '50%',
        height: 50,
        border: 'solid',
        borderRightWidth: 0,
        borderLeftWidth: 5,
        borderBottomWidth: 5,
        borderTopWidth: 0,
        borderRightColor: 'transparent',
        borderLeftColor: '#0F4C75',
        borderBottomColor: '#0F4C75',
        borderTopColor: '#0F4C75',
        borderTopLeftRadius: 30,
        
    },

    registerTab: {
        width: '50%',
        border: 'solid',
        borderRightWidth: 5,
        borderBottomWidth: 0,
        borderLeftWidth: 5,
        borderTopWidth: 0,
        borderRightColor: '#0F4C75',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        borderLeftColor: '#0F4C75',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },

    loginTextStyle: {
        fontFamily: 'MontserratSB',
        marginTop: 10,
        alignSelf: 'center',
        fontSize:18,
        color: '#fff',
        marginRight: 95,
        marginLeft: 100,
    },

    registerTextStyle: {
        fontFamily: 'MontserratSB',
        marginTop: 10,
        alignSelf: 'center',
        fontSize:18,
        color: '#fff',
        marginLeft: 75,
        marginRight: 100,
    },

    buttonStyle: {
        width: '65%',
        alignSelf: 'center',
        backgroundColor: "#0F4C75",
        height: 30,
        borderRadius: 10,
    },

    buttonTextStyle: {
        fontFamily: 'Montserrat',
        color: '#fff',
        alignSelf: 'center',
        fontSize: 18,
        marginTop:4,
    },

    sloganText: {
        marginTop: 30,
        fontFamily: 'MontserratSB',
        alignSelf: 'center',
        color: '#000',
        fontSize:22,
    },

    passwordResetText: {
        fontFamily: 'Montserrat',
        alignSelf: 'center',
        color: '#fff',
        fontSize:16,
    },

    spacingSmall: {
        marginTop:20
    },

    divider: {
        border: 'solid',
        borderColor: '#BBE1FA',
        alignSelf: 'center',
        width: 500,
    },

    fill: {
    }
  });