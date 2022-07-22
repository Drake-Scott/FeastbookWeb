import React, {useState, useEffect} from 'react';
import './bootstrap/css/bootstrap-grid.min.css';
import './bootstrap/css/bootstrap.min.css';
import '../assets/css/HomePage.css'
import Topbar from './Topbar';
import { Container, Row, Col, Modal } from 'react-bootstrap';

const HomeScreen = ({navigation, userToken}) => {

    const [loading, setLoading] = useState(false);
    const [postResults, setPostResults] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <div className='background'>
            <Topbar navigation={navigation} screenSelected={1}/>
            {/* <div className='homeTitle'>Explore</div> */}
            <Container className='tester'>
                <Row>

                </Row>
            </Container>
        </div>
    )
}

export default HomeScreen