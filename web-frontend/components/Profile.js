import React, {useState, createRef} from 'react';
import Topbar from './Topbar';

const Profile = ({navigation, userToken}) => {

  console.log('in Profile: usertoken = ' + JSON.stringify(userToken));
  function gotoUser()
  {
      return;
  }
  function gotoPlus()
  {
      navigation.navigate('FeastBook - Add Post');
  }
  function gotoHome()
  {
      navigation.navigate('FeastBook - Home');
  }

  return (
    <>
        <Topbar navigation={navigation} 
                screenSelected={3}
                gotoPlus={gotoPlus} gotoUser={gotoUser} gotoHome={gotoHome}/>
        <div>Profile Page: <br /> userToken = {JSON.stringify(userToken)}</div>
    </>
  )
}

export default Profile