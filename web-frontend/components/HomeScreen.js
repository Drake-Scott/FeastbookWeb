import React, {useState, useEffect} from 'react';
import './bootstrap/css/bootstrap-grid.min.css';
import './bootstrap/css/bootstrap.min.css';
import '../assets/css/HomePage.css'
import Topbar from './Topbar';
import { Container, Row, Col, Modal } from 'react-bootstrap';

const HomeScreen = ({navigation, userToken, setUserToken, setVisitToken}) => {

    const [loading, setLoading] = useState(false);
    const [postResults, setPostResults] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
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
            setPostResults(arr);
        })
        .catch((error) => {
            console.error(error);
        });
      }, []);

    return (
        <div className='background'>
            <Topbar navigation={navigation} screenSelected={1} 
            setUserToken={setUserToken} setVisitToken={setVisitToken}/>
            {/* <div className='homeTitle'>Explore</div> */}
            <Container className='homeContainer'>
                {postResults.length > 0 ? 
                postResults.map(item => 
                    (<Row key={item.id}>
                        <Col className='homeImgCol'>
                        <img src={item.image} className='homePostImg'/>
                        </Col>
                        <Col className='homeInfoCol'>
                            <div>
                                Poster: {item.posterId}
                            </div>
                            <div>
                                Ingedients:<br/>
                                {item.ingredients}
                            </div>
                            <div>
                                Directions<br/>
                                {item.directions}
                            </div>
                        </Col>
                    </Row>))
                : 'no posts found'
                }
            </Container>
        </div>
    )
}

export default HomeScreen