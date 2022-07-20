import React, {useState, createRef} from 'react';
import '../assets/css/Topbar.css'
import home from '../assets/icons/home.png'
import homeFilled from '../assets/icons/homeFilled.png'
import plus from '../assets/icons/plus.png'
import plusFilled from '../assets/icons/plusFilled.png'
import user from '../assets/icons/user.png'
import userFilled from '../assets/icons/userFilled.png'
import search from '../assets/icons/search.png'

const Topbar = ({navigation, screenSelected, gotoUser, gotoPlus, gotoHome}) => {

    var homeIcon, plusIcon, userIcon;

    if(screenSelected != null)
    {
        switch(screenSelected)
        {
            //Home selected
            case 1:
                homeIcon = homeFilled;
                plusIcon = plus;
                userIcon = user;
                break;
            // Add post selected
            case 2:
                homeIcon = home;
                plusIcon = plusFilled;
                userIcon = user;
                break;
            // Profile selected
            case 3: 
                homeIcon = home;
                plusIcon = plus;
                userIcon = userFilled;
                break;
            // Favorites selected
            case 4: 
                homeIcon = home;
                plusIcon = plus;
                userIcon = userFilled;
                break;
        }
    }   

    const handleHomeClick = () => {
        gotoHome();
    }

    const handlePlusClick = () => {
        gotoPlus();
    }

    const handleProfileClick = () => {
        gotoUser();
    }


  return (
    <>
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <span className='logo'>FeastBook</span>
            </div>
            <div className='topbarCenter'>
                <div className='searchBar'>
                    <img src={search} className='searchIcon'/>
                    <input placeholder='Search...' 
                            className='searchInput'
                            type='text'/>
                </div>
            </div>
            <div className='topbarRight'>
                <div className='topbarIcons'>
                    <div className='topbarIconItem'>
                        {/* <img src={homeIcon}/> */}
                        <img src={homeIcon} onClick={handleHomeClick}/>
                    </div>
                    <div className='topbarIconItem'>
                        <img src={userIcon} onClick={handleProfileClick}/>
                    </div>
                    <div className='topbarIconItem'>
                        {/* <img src={plusIcon}/> */}
                        <img src={plusIcon} onClick={handlePlusClick}/>
                    </div>
                
                
                
                </div>
            </div>
        </div>
    </>
  )
}

export default Topbar