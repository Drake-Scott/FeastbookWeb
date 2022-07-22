import React, {useState, useRef, useEffect} from 'react';
import Topbar from './Topbar';
import '../assets/css/Profile.css'
import cancelIcon from '../assets/icons/cancel.png'
import { Container, Row, Col, Modal } from 'react-bootstrap';

const Profile = ({navigation, userToken}) => {

  const [loading, setLoading] = useState(false);
  const [postResults, setPostResults] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    let dataToSend = {id: userToken.id};
    var s = JSON.stringify(dataToSend)
    fetch('http://localhost:5000/api/userposts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: s,
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
                id: response.results[i]._id
            }
            arr.push(temp);
        }
        // console.log(arr[0].image);
        setPostResults(arr);
        // console.log(postResults);
    })
    .catch((error) => {
        console.error(error);
    });
  }, []);
  // console.log(JSON.stringify(postResults[0]));
  // if(postResults[0] !== undefined) console.log(postResults[0].image);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showPosts = (post) => {
    console.log(post);
    setSelectedPost(post);
    handleShow();
  }

  return (
    <div className='background'>
      <Topbar navigation={navigation} screenSelected={3}/>
      <Modal show={show} onHide={handleClose} className='modalContainer'>
        <Modal.Header className='modalHeader'>
          <Modal.Title className='modalTitle'>
            {selectedPost != undefined ? selectedPost.name : 'No post selected.'}
          </Modal.Title>
          <img src={cancelIcon} onClick={handleClose} className='cancelIcon'/>
        </Modal.Header>
        <Modal.Body>
          {selectedPost != undefined ?
          <div className='modalBody'>
            <div className='imageHalf'>
              <img src={selectedPost.image}/>
            </div>
            <div className='infoHalf'>
              <div>
                Ingedients:<br/>
                {selectedPost.ingredients}
              </div>
              <div>
                Directions<br/>
                {selectedPost.directions}
              </div>
            </div>
          </div>
          : ''
          }
        </Modal.Body>
      </Modal> 
      <Container>
        <Row className='headerRow'>
          <Col md={5} className='nameCell'>{userToken.firstname}</Col>
          <Col md={{span : 5, offset: 2}} className='favoritesCell'
                onClick={() => navigation.navigate('FeastBook - Likes')}>Liked</Col>
        </Row>
        <Row className='postsRow'>            
          {postResults.length > 0 ? 
            postResults.map(item => 
              (<Col xs={4}  
                    key={item.id}
                    className='postCell'>
                <img src={item.image} onClick={() => showPosts(item)} className='postImage'/>
              </Col>))                
            : 'No posts...'
          } 
        </Row>         
      </Container>
    </div>
  )
}

export default Profile