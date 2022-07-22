import React, {useState, useEffect, useRef} from 'react';
import searchIcon from '../assets/icons/search.png'
import '../assets/css/Searchbar.css'

const SearchBar = ({navigation, setVisitToken}) => {

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        if(search === '') {setSearch(null)}
        let dataToSend = {
            search: search
        }
        let s = JSON.stringify(dataToSend);
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
        })
        .catch((error) => {
            setLoading(false);
            console.error(error);
        });
    }

    const visitProfile = (user) =>
    {
        setVisitToken(user);
        console.log('visit token in searchbar: ' + JSON.stringify(user));
        navigation.navigate('FeastBook - Visiting');
    }

    return (
        <div className='searchContainer'>
            <div className='searchBar' >
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
                    return (
                        <div    key={user.id}
                                className='searchResult'
                                onClick={() => visitProfile(user)}>
                            {user.username}
                        </div>
                    )
                })}
            </div>
        </div>
  )
}

export default SearchBar