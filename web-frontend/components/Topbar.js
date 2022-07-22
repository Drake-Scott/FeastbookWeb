import React, {useState, useEffect, useRef} from 'react';
import '../assets/css/Topbar.css'
import home from '../assets/icons/home.png'
import homeFilled from '../assets/icons/homeFilled.png'
import plus from '../assets/icons/plus.png'
import plusFilled from '../assets/icons/plusFilled.png'
import user from '../assets/icons/user.png'
import userFilled from '../assets/icons/userFilled.png'
import searchIcon from '../assets/icons/search.png'

const Topbar = ({navigation, screenSelected}) => {

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

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
    
    var homeIcon, plusIcon, userIcon;

    // Top right navigation icons.
    const handleHomeClick = () => {
        navigation.navigate('FeastBook - Home');
    }
    const handlePlusClick = () => {
        navigation.navigate('FeastBook - Add Post');
    }
    const handleProfileClick = () => {
        navigation.navigate('FeastBook - Profile');
    }

    const handleSearch = () => {
        let dataToSend = {
            search: search
        }
        let s = JSON.stringify(dataToSend);
        console.log(s);
        fetch('http://localhost:5000/api/searchuser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: s,
        })
        .then((response) => response.json())
        .then((response) => {
            setLoading(false);
            let arr = [];
            for (let i = 0; i < 10; i++) {
                if (typeof(response.results[i]) !== 'undefined') {
                    let temp = {
                        username: response.results[i].login,
                        id: response.results[i].id
                    }
                    arr.push(temp)
                }
                else break;
            }
            arr.sort((a, b) => a.username.localeCompare(b.username, undefined, {sensitivity: 'base'}));
            setSearchResults(arr);
            console.log(searchResults);
        })
        .catch((error) => {
            setLoading(false);
            console.error(error);
        });
    }

    const visitProfile = () =>
    {
        console.log('visit profile id: ' + 1)
    }

    const handleInputBlur = () =>
    {
        setSearch(null);
        console.log('input blur handler called. search = ' + search)
    }

  return (
    <>
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <span className='logo'>FeastBook</span>
            </div>
            <div className='topbarCenter'>
                <div className='searchContainer'
                     onBlur={handleInputBlur} 
                >
                    <div className='searchBar'>
                        <img src={searchIcon} className='searchIcon'/>
                        <input placeholder='Search...' 
                               className='searchInput'
                               type='text' 
                               onChange={e => {setSearch(e.target.value)}}                                
                               onKeyUp={handleSearch} 
                        />
                    </div>
                    <div className='searchResultsContainer'>
                        {searchResults.map(user => {
                            return (<button 
                                        key={user.id}
                                        className='searchResult'
                                        onClick={() => {visitProfile}}
                                    >
                                            {user.username}
                                    </button>)
                        })}
                    </div>
                </div>
            </div>
            <div className='topbarRight'>
                <div className='topbarIcons'>
                    <div className='topbarIconItem'>
                        <img src={homeIcon} onClick={handleHomeClick}/>
                    </div>
                    <div className='topbarIconItem'>
                        <img src={userIcon} onClick={handleProfileClick}/>
                    </div>
                    <div className='topbarIconItem'>
                        <img src={plusIcon} onClick={handlePlusClick}/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Topbar