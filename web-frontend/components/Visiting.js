import React, {useState, useRef, useEffect} from 'react';
import Topbar from './Topbar';
import '../assets/css/Profile.css';
import cancelIcon from '../assets/icons/cancel.png'
import like from '../assets/icons/like.png'
import likeF from '../assets/icons/likeFilled.png'
import { Container, Row, Col, Modal, Tabs, Tab, Alert, Button } from 'react-bootstrap';

const Visiting = ({navigation, userToken, setUserToken, visitToken, 
  setVisitToken, likedPosts, setLikedPosts}) => {

  const [loading, setLoading] = useState(false);
  const [postResults, setPostResults] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [test, setTest] = useState(false);
  const [likeIcon, setLikeIcon] = useState(like);
  


  useEffect(() => {
    displayFavorites();
  }, []);

  const displayFavorites = () => {
    setLoading(true);
    console.log("likedPosts in visiting: " + likedPosts)

    let dataToSend = {id: visitToken.id};
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
        setLoading(false);
        setPostResults(arr);
    })
    .catch((error) => {
        console.error(error);
    });
  }
  // console.log("liked posts in visiting: " + likedPosts.length);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false); 
    setTimeout(setLikeIcon(like), 100);    
  };
  const handleShow = () => setShow(true);

  const showPost = (post) => {
    console.log(post);
    setSelectedPost(post);
    handleShow();
  }

  const likesHandler = (postid) => {
    // if(likedPosts.length > 0 && likedPosts.includes(postid)) handleDislike();
    // else if(likedPosts.length <= 0 || !likedPosts.includes(postid))handleLike();
    handleLike();
  }

  const handleLike = () => {
    console.log("Liked post: " + selectedPost.name)
    let dataToSend = {userid: userToken.id, postid: selectedPost.id};
    var s = JSON.stringify(dataToSend)
    console.log(s);
    fetch('http://localhost:5000/api/likepost', {
        method: 'POST',
        headers: {
            //'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: s,
    })
    .then((response) => response.json())
    .then((response) => {
      setLikeIcon(likeF);
      console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });
  }

  const handleDislike = () => {
    console.log("DiLiked post: " + selectedPost.name)
    let dataToSend = {userid: userToken.id, postid: selectedPost.id};
    var s = JSON.stringify(dataToSend)
    console.log(s);
    fetch('http://localhost:5000/api/dislikepost', {
        method: 'POST',
        headers: {
            //'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: s,
    })
    .then((response) => response.json())
    .then((response) => {
        let removalIndex = likedPosts.indexOf(selectedPost.id);
        let retArr = likedPosts.splice(removalIndex, 1);
        setLikedPosts(retArr);
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });
  }


  return (
    <div className='background'>
      <Topbar navigation={navigation} screenSelected={4}
      setUserToken={setUserToken} setVisitToken={setVisitToken} />
      <Modal show={show} onHide={handleClose} className='modalContainer'>
        <Modal.Body>
          {selectedPost != undefined ?
          <Container className='modalBodyContainer'>
            <Row className='modalHeaderRow'>
              <Col xs={9} className="modalHeaderCol1">{selectedPost.name}</Col>
              <Col className="modalHeaderCol2">
                <img src={likeIcon} onClick={() => likesHandler(selectedPost.id)} className='vLikeIcon'/>
                <img src={cancelIcon} onClick={handleClose} className='vCancelIcon'/>
              </Col>
            </Row>
            <Row className='modalContentRow'>
              <Col className='imageHalf'>
                <img src={selectedPost.image}/>
              </Col>
              <Col className='infoHalf'>
                <Tabs
                  defaultActiveKey="ingredients"
                  id="postTabs"
                  className="mb-3"
                >
                  <Tab eventKey="ingredients" title="Ingredients" className='ingTab'>
                    {selectedPost.ingredients}
                  </Tab>
                  <Tab eventKey="directions" title="Directions" className='dirTab'>
                    {selectedPost.directions}
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Container>
          : 'Error: no post selected.'
          }
        </Modal.Body>
      </Modal> 
      <div>
        {JSON.stringify(visitToken)}
      </div>
      <Container>
        <Row className='headerRow'>
          <Col md={5} className='nameCell'>{visitToken.username}</Col>
        </Row>
        <Row className='postsRow'>            
          {postResults.length > 0 ? 
            postResults.map(item => 
              (<Col xs={4}  
                    key={item.id}
                    className='postCell'>
                <img src={item.image} onClick={() => showPost(item)} className='postImage'/>
              </Col>))                
            : 'No posts...'
          } 
        </Row>         
      </Container>
    </div>
  )
}

export default Visiting