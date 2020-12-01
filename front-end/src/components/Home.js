import React from 'react'
import { Col, Row } from "react-bootstrap"
import Signup from './Signup'
import Login from './Login'

const Home = () => {


        return(
            <div className="text-center">
                <h2>welcome to fakeTwitter</h2>
                <Row>
                    <Col><Signup /></Col>
                    <Col> <Login  /></Col>
                </Row>                     
            </div>
        )
    }
export default Home