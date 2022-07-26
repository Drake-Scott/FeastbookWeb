import React, { useState, useRef } from 'react';
import '../assets/css/PWResetSuccessful.css'
import './bootstrap/css/bootstrap-grid.min.css';
import './bootstrap/css/bootstrap.min.css';
import { Container, Row, Col, Button} from 'react-bootstrap';

const PWResetSuccessful = ({navigation}) => {

    const [authCode, setAuthCode] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const handleSubmitPress = () => {
        console.log("submit press handled")
        if (!authCode) {
            setErrortext('Code required');
            console.log('Code required');
            return;
        }
        if (!password1) {
            setErrortext('Password required');
            console.log('Password required');
            return;
        }
        if (password1 !== password2) {
            setErrortext("Passwords don't match");
            console.log("Passwords don't match");
            return;
        }
        setLoading(true);
        let dataToSend = {otp: authCode, newPassword1: password1, newPassword2: password2};
        var s = JSON.stringify(dataToSend)
        fetch('https://feastbook.herokuapp.com/api/resetpassword', {
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
            console.log(response);
            if(response.error !== ''){
                if (response.error === "invalid token") {
                    setErrortext("Invalid Code")
                    console.log("Invalid Code");
                }
                if (response.error === "passwords do not match") {
                    setErrortext("Passwords do not match.")
                    console.log("Passwords do not match.");
                }
            }
            else {
                navigation.navigate('Login')
            }
        })
        .catch((error) => {
            setLoading(false);
            console.error(error);
        });
    }

    const codeInputHandler = (event) => {
        setAuthCode(event.target.value);
    }

    const passInputHandler1 = (event) => {
        setPassword1(event.target.value);
        console.log("hello")
    }

    const passInputHandler2 = (event) => {
        setPassword2(event.target.value);
        console.log("hello")
    }

  return (
    <div className='background'>
        <Container className='pwrsContainer' fluid>
            <Row className='pwrsRow'>
                <div className='pwsrHeaderText'>
                    Check your email for the confirmation code.
                </div>
            </Row>
            <Row className='pwrsRow'>
                <Col className='pwrsLabelCol' md={5}>
                    <label>Input the code</label>
                </Col>
                <Col className='pwrsInputCol' md={7}>
                    <input type='text' placeholder='code...'
                    onChange={codeInputHandler}/>
                </Col>
            </Row>
            <Row className='pwrsRow'>
                <Col className='pwrsLabelCol' md={5}>
                    <label>Enter new password</label>
                </Col>
                <Col className='pwrsInputCol' md={7}>
                    <input type='password' placeholder='new password...'
                    onChange={passInputHandler1}/>
                </Col>
            </Row>
            <Row className='pwrsRow'>
                <Col className='pwrsLabelCol' md={5}>
                    <label>Confirm password</label>
                </Col>
                <Col className='pwrsInputCol' md={7}>
                    <input type='password' placeholder='confirm password...'
                    onChange={passInputHandler2}/>
                </Col>
            </Row>
            <Row className='pwrsRow'>
                <button className='forgotButtonStyle'
                onClick={handleSubmitPress}>
                    Submit password change.
                </button>
            </Row>
            <Row className='pwrsFooterRow'>
                <div className='loginReturn' 
                onClick={() => navigation.replace('Login')}>
                    Or click here to return to login.
                </div>
            </Row>
            <Row className='pwrsErrorRow'>
                {errortext != '' ? (
                    <div className='forgotErrorText'>
                        {errortext}
                    </div>
                ) : null}
            </Row>
        </Container>
    </div>
  )

}

export default PWResetSuccessful