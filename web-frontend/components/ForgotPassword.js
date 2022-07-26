import React, {useState} from 'react';
import { Container, Row, Col, Modal, Tabs, Tab } from 'react-bootstrap';
import './bootstrap/css/bootstrap-grid.min.css';
import './bootstrap/css/bootstrap.min.css';
import '../assets/css/ForgotPassword.css'

const ForgotPassword = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const handleSubmitPress = () => {
        console.log("submit press handled")
        if (!email) {
            setErrortext('Email required');
            console.log('Email required');
            return;
        }
        setLoading(true);
        let dataToSend = {email: email};
        var s = JSON.stringify(dataToSend)
        fetch('https://feastbook.herokuapp.com/api/forgotpassword', {
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
            if (response.error !== ''){
                if(response.error === 'Invalid Email') {
                    setErrortext('Invalid Email');
                }
                if(response.error === 'user does not exist') {
                    setErrortext('user does not exist');
                }
            }
            else {
                //tell them it worked
                navigation.navigate('PWResetSuccessful')
            }
        })
        .catch((error) => {
            setLoading(false);
            console.error(error);
        });
    }

    const emailInputHandler = event => {
        setEmail(event.target.value);
    }

    return (
        <div className='background'>
            <Container className='forgotContainer' fluid>
                <Row className='forgotHeaderRow'>
                    <div>Please enter your email:</div>
                </Row>
                <Row className='forgotInputRow'>
                    <input type='text' placeholder='email...'
                    onChange={emailInputHandler} className='forgotEmailInput'/>
                </Row>
                <Row className='forgotFooterRow'>
                    <button className='forgotButtonStyle'
                    onClick={handleSubmitPress}>Send me the code</button><br/>
                </Row>
                <Row className='forgotFooterRow2'>
                    <div className='loginReturn' 
                    onClick={() => navigation.replace('Login')}>
                        Or click here to return to login.
                    </div>
                </Row>
                <Row className='forgotFooterRow2'>
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

export default ForgotPassword