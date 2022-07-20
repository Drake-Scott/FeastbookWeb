import React, {useState, createRef} from 'react';
import Topbar from './Topbar';

const Profile = ({navigation, userToken}) => {

  console.log('in Profile: usertoken = ' + JSON.stringify(userToken));

  return (
    <>
        <Topbar navigation={navigation} 
                screenSelected={3}/>
        <div>Profile Page: <br /> userToken = {JSON.stringify(userToken)}</div>
    </>
  )
}

export default Profile