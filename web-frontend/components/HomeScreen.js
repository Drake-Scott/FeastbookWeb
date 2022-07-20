import React, {useState, createRef} from 'react';
import './bootstrap/css/bootstrap-grid.min.css';
import './bootstrap/css/bootstrap.min.css';
import '../assets/home-page.css';
import Topbar from './Topbar';

const HomeScreen = ({navigation, userToken}) => {
    console.log('in HomeScreen: usertoken = ' + JSON.stringify(userToken));

    function gotoUser()
    {
        navigation.navigate('FeastBook - Profile');
    }
    function gotoPlus()
    {
        navigation.navigate('FeastBook - Add Post');
    }
    function gotoHome()
    {
        return;
    }

    return (
        <>
            <Topbar navigation={navigation} 
                    screenSelected={1}
                    gotoPlus={gotoPlus} gotoUser={gotoUser} gotoHome={gotoHome}/>
            <div>HOME PAGE</div>
        </>
    )
}

export default HomeScreen

// const styles = StyleSheet.create({
//     header: {
//         backgroundColor: '#0F4C75',
//     },
  
//     heading: {
//         margin: 10,
//         alignSelf: 'center',
//         color: '#BBE1FA',
//         fontSize:32,
//         fontWeight: '500',
//         fontFamily: 'MontserratSB'
//     },

//     mainBody: {
//         backgroundColor: '#fff',
//         alignSelf: 'stretch'
//     },

//     SafeAreaView: {
//         width: '75%',
//         border: 'solid',
//         borderRightWidth: 5,
//         borderBottomWidth: 5,
//         borderLeftWidth: 5,
//         borderTopWidth: 0,
//         borderTopColor: 'transparent',
//         borderBottomColor: '#0F4C75',
//         borderRightColor: '#0F4C75',
//         borderLeftColor: '#0F4C75',
//         borderBottomEndRadius: 30,
//         borderBottomLeftRadius: 30,
//         alignSelf: 'center',
//         backgroundColor: '#1B262C',

//     },

//     loginPrompts: {
//         fontFamily: 'Montserrat',
//         paddingLeft: 20,
//         color: '#fff',
//         fontSize:16,
//     },

//     inputStyle: {
//         fontFamily: 'Montserrat',
//         backgroundColor: '#fff',
//         height: 40,
//         margin: 12,
//         alignSelf: 'center',
//         width: '95%',
//         borderWidth: 1,
//         borderColor: '#fff',
//         borderRadius:10,
//         padding: 10,
//     },

//     errorTextStyle: {
//     },

//     tabs: {
//         width: '75%',
//         marginTop: 30,
//         borderTopWidth: 5,
//         borderTopColor: '#0F4C75',
//         borderBottomColor: 'transparent',
//         borderLeftColor: 'transparent',
//         borderRightColor: 'transparent',
//         borderTopRightRadius: 30,
//         borderTopLeftRadius: 30,
//         flexDirection:'row', 
//         flexWrap:'wrap', 
//         alignSelf: 'center',
//         backgroundColor: '#1B262C'
//     },

//     loginTab: {
//         width: '50%',
//         height: 50,
//         border: 'solid',
//         borderRightWidth: 0,
//         borderLeftWidth: 5,
//         borderBottomWidth: 5,
//         borderTopWidth: 0,
//         borderRightColor: 'transparent',
//         borderLeftColor: '#0F4C75',
//         borderBottomColor: '#0F4C75',
//         borderTopColor: '#0F4C75',
//         borderTopLeftRadius: 30,
        
//     },

//     registerTab: {
//         width: '50%',
//         border: 'solid',
//         borderRightWidth: 5,
//         borderBottomWidth: 0,
//         borderLeftWidth: 5,
//         borderTopWidth: 0,
//         borderRightColor: '#0F4C75',
//         borderBottomColor: 'transparent',
//         borderTopColor: 'transparent',
//         borderLeftColor: '#0F4C75',
//         borderTopRightRadius: 30,
//         borderTopLeftRadius: 30,
//     },

//     loginTextStyle: {
//         fontFamily: 'MontserratSB',
//         marginTop: 10,
//         alignSelf: 'center',
//         fontSize:18,
//         color: '#fff',
//         marginRight: 95,
//         marginLeft: 100,
//     },

//     registerTextStyle: {
//         fontFamily: 'MontserratSB',
//         marginTop: 10,
//         alignSelf: 'center',
//         fontSize:18,
//         color: '#fff',
//         marginLeft: 75,
//         marginRight: 100,
//     },

//     buttonStyle: {
//         width: '65%',
//         alignSelf: 'center',
//         backgroundColor: '#0F4C75',
//         height: 30,
//         borderRadius: 10,
//     },

//     buttonTextStyle: {
//         fontFamily: 'Montserrat',
//         color: '#fff',
//         alignSelf: 'center',
//         fontSize: 18,
//         marginTop:4,
//     },

//     sloganText: {
//         marginTop: 30,
//         fontFamily: 'MontserratSB',
//         alignSelf: 'center',
//         color: '#000',
//         fontSize:22,
//     },

//     passwordResetText: {
//         fontFamily: 'Montserrat',
//         alignSelf: 'center',
//         color: '#fff',
//         fontSize:16,
//     },

//     spacingSmall: {
//         marginTop:20
//     },

//     divider: {
//         border: 'solid',
//         borderColor: '#BBE1FA',
//         alignSelf: 'center',
//         width: 500,
//     },

//     fill: {
//     }
//   });