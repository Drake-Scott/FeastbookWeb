import React, { useState } from 'react';
import './bootstrap/css/bootstrap-grid.min.css';
import './bootstrap/css/bootstrap.min.css';
import '../assets/css/ResetPassword.css'
import { Container, Row, Col } from 'react-bootstrap';

const ResetPassword = ({navigation}) => {
  return (
    <Container>
        <Row className='resetHeaderRow'> HELLO </Row>
        <Row className='resetInputRow'> HELLO </Row>
        <Row className='resetFooterRow'> HELLO </Row>
    </Container>
  )
}

export default ResetPassword