import React, {useState } from 'react';
import './bootstrap/css/bootstrap-grid.min.css';
import './bootstrap/css/bootstrap.min.css';
import '../assets/css/RegisterSuccess.css';
import checkmark from '../assets/icons/checkmark.png';
import { Container, Row, Col, Button } from 'react-bootstrap';

const RegisterSuccess = ({navigation}) => {

  return (
    <Container fluid>
        <Row className='regSuccessRow'>
            <img src={checkmark} />       
        </Row>
        <Row className='regSuccessRow'>
            Heyo
        </Row>
        <Row className='regSuccessRow'>
            <Button>Ready to log in?</Button>
        </Row>
    </Container>
  )

}

export default RegisterSuccess