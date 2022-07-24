import React, { useState, useRef } from 'react';
import Resizer from "react-image-file-resizer";
import '../assets/css/AddPost.css'
import './bootstrap/css/bootstrap-grid.min.css';
import './bootstrap/css/bootstrap.min.css';
import Topbar from './Topbar'
import defaultImg from '../assets/addPost.png'
import { Container, Row, Col, Button} from 'react-bootstrap';

const AddPost = ({navigation, userToken, setUserToken, setVisitToken}) => {

    const [selectedFile64, setSelectedFile64] = useState(null)
    const [image, setImage] = useState(defaultImg);
    const [inputName, setInputName] = useState('');
    const [inputIng, setInputIng] = useState('');
    const [inputDir, setInputDir] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const nameRef = useRef('');
    const ingRef = useRef('');
    const dirRef = useRef('');

    const fileSelectedHandler = async (event) => {
        if(event.target.files && event.target.files[0]){
            let s = URL.createObjectURL(event.target.files[0]);
            setImage(s);
            const resizedImg = await resizeFile(event.target.files[0]);
            const base64 = await convertBase64(event.target.files[0]);
            setSelectedFile64(resizedImg);
        }
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    const resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
        uri => {
          resolve(uri);
        }, 'base64', 300, 300 );
    });

    const fileUploadHandler = () => {
        // console.log("selectedFile64: " + selectedFile64)
        // console.log("inputName: \n" + inputName);
        // console.log("inputIngredients: \n" + inputIng);
        // console.log("inputDirections: \n" + inputDir);
        setErrortext('');
        if (!selectedFile64) {
            alert('Image required');
            return;
        }
        if (!inputName) {
            alert('Dish name required');
            return;
        }
        if (!inputIng) {
            alert('Ingredients required');
            return;
        }
        if (!inputDir) {
            alert('Directions required');
            return;
        }
        setLoading(true);
        let dataToSend = {userid: userToken.id, name:inputName, photo: selectedFile64, ingredients: inputIng, directions: inputDir};
        var s = JSON.stringify(dataToSend)
        // console.log(s);
        fetch('http://localhost:5000/api/createpost', {
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
            setSelectedFile64(null);
            setImage(defaultImg);
            setInputName('');
            nameRef.current = '';
            setInputIng(''); 
            ingRef.current = '';
            setInputDir(''); 
            dirRef.current = '';
            console.log("Post was successful" + response);
            navigation.replace('FeastBook - Profile');
        })
        .catch((error) => {
            setLoading(false);
            console.error(error);
        });
    }

    const handleNameChange = event => {
        setInputName(event.target.value)
    } 

    const handleIngChange = event => {
        setInputIng(event.target.value)
    } 

    const handleDirChange = event => {
        setInputDir(event.target.value)
    } 

    return (
        <>
            <div className='background'>  
                <Topbar navigation={navigation} screenSelected={2} 
                setUserToken={setUserToken} setVisitToken={setVisitToken}/>
                <Container className='postContainer'>
                    <Row className='postHeaderRow'>
                        <Col className='postHeaderCol'>
                            <h3>Create a New Post</h3>
                        </Col>
                    </Row>
                    <Row className='postDetailsRow'>
                        <Col className='postImageCol'>
                            <label>Upload an Image</label><br/>
                            <img src={image} className='postImg'/><br/>                  
                            <input type='file' onChange={fileSelectedHandler} ref={nameRef}/>
                        </Col>
                        <Col className='postInfoCol'>
                            <Row className='postNameInputRow'>
                                <div className='postNameCell'>
                                    <label>Dish Name</label><br/>
                                    <input type='text' className='postNameTextInput' 
                                    onChange={handleNameChange}/>
                                </div>
                            </Row>
                            <Row className='postInfoRow'>
                                <Col className='ingredientsInputCol'>
                                    <div className='postInfoCell'>
                                        <label>Ingredients</label><br/>
                                        <textarea type='textarea' className='postInfoTextInput'
                                        onChange={handleIngChange} ref={ingRef}/>
                                    </div>
                                </Col>
                                <Col className='directionsInputCol'>
                                    <div className='postInfoCell'>
                                        <label>Directions</label><br/>
                                        <textarea type='textarea' className='postInfoTextInput'
                                        onChange={handleDirChange} ref={dirRef}/>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='postSubmitRow'>
                                <button className='buttonStyle' onClick={fileUploadHandler}>Create Post</button>
                            </Row>
                        </Col>                    
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default AddPost
