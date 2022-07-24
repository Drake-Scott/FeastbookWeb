import React, {useState, useEffect} from 'react';
import './bootstrap/css/bootstrap-grid.min.css';
import './bootstrap/css/bootstrap.min.css';
import '../assets/css/HomePage.css'
import like from '../assets/icons/like.png'
import likeF from '../assets/icons/likeFilled.png'
import Topbar from './Topbar';
import { Container, Row, Col, Modal, Tabs, Tab } from 'react-bootstrap';

const HomeScreen = ({navigation, userToken, setUserToken, setVisitToken}) => {

    const [loading, setLoading] = useState(false);
    const [nameResults, setNameResults] = useState([]);
    const [postResults, setPostResults] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        displayPosts();
        getPosterNames();
      }, []);

    const displayPosts = () => {
        setLoading(true)
        fetch('http://localhost:5000/api/posts', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            let arr = [];
            for (let i = 0; i < response.results.length; i++) {
                let temp = {
                    name: response.results[i].name,
                    image: response.results[i].photo,
                    ingredients: response.results[i].ingredients,
                    directions: response.results[i].directions,
                    id: response.results[i]._id,
                    posterId: response.results[i].userid
                }
                arr.push(temp);
            }
            setLoading(false);
            setPostResults(arr);
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    const getPosterNames = () =>
    {
        let arr = [];
        for (let i = 0; i < postResults.length; i++) {
            let dataToSend = {userid: postResults[i].posterId}
            var s = JSON.stringify(dataToSend)
            fetch('http://localhost:5000/api/getuserinfo', {
                method: 'POST',
                headers: {
                    //'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: s
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response.results[0].login)
                let temp = {
                    posterName: response.results[0].login,
                    name: postResults[i].name,
                    image: postResults[i].image,
                    ingredients: postResults[i].ingredients,
                    directions: postResults[i].directions,
                    id: postResults[i].id,
                    posterId: postResults[i].posterId,
                }
                console.log(temp);
                arr.push(temp);
            })
            .catch((error) => {
                console.error(error);
            });
        }
        console.log(arr)
        setNameResults(arr);   
    }

    return (
        <div className='background'>
            <Topbar navigation={navigation} screenSelected={1} 
            setUserToken={setUserToken} setVisitToken={setVisitToken}/>
            <Container className='homeContainer'>
                {postResults.length > 0 ? 
                postResults.map(item =>(<div key={item.id} className='allTheInfo'>
                    <Row className='homePostHeaderRow'>
                        <Col className='homePostNameCol' md={8}>
                            {item.name}
                        </Col>
                        <Col className='homeUserNameCol' md={4}>
                            Poster: {item.posterId}
                        </Col>
                        
                    </Row>
                    <Row className='homePostContentRow'>
                        <Col className='homeImgCol'>
                        <img src={item.image} className='homePostImg'/>
                        </Col>
                        <Col className='homeInfoCol'>
                            
                            <div className='homeInfoText'>
                                Ingedients:<br/>
                                {item.ingredients}
                            </div>
                            <div>
                                Directions<br/>
                                {item.directions}
                            </div>
                        </Col>
                    </Row>
                </div>))
                : 'no posts found'
                }
            </Container>
        </div>
    )
}

export default HomeScreen