import React, { useContext, useState } from 'react'
import {Button, Col, Row, Container, Form, Card} from "react-bootstrap"
import { authContext } from '../context/AuthContext'
import Tweets from './Tweets'


const HomePage = () => {

    const {setAuthData, auth} = useContext(authContext)
    const [tweet, setTweet] = useState()
    const fetchTweets = auth.data.tweets || [] //bara de egna tweetsen

    const submitTweet = (e) => {
        const userId = auth.data.id
        fetch("https://1lfzbgijz6.execute-api.eu-north-1.amazonaws.com/dev/users/" + userId + "/tweet", {
            method: "PUT",
            headers: {
                Accept: "application/json", "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tweet: tweet
            })   
        })
        .then((response) => response.json())
        .then(res => {
            console.log("tweet sent")
        }).catch(error => {
            console.log(error)
        })
    }

    //emailQueue
    // https://sqs.eu-north-1.amazonaws.com/951445330328/emailQueue

    const onLogOut = () => {
        setAuthData(null)
    }


        return(
            <>
            <Row>
                <Col>
                    <Container>
                        <h2 className="text-center">{`Welcome ${auth.data.username}`} </h2>
                        <Card>
                            <Form.Row>
                                <Form.Group as= {Col}>
                                <Form.Label>Send a tweet:</Form.Label>
                                <Form.Control required autoComplete="off"
                                        type="text"
                                        onChange= {e => setTweet(e.target.value)}
                                        className={"bg-dark text-white"}
                                        placeholder= "Send a tweet!" />
                                        <br/>
                                    <Button onClick={submitTweet}>Tweet!</Button>
                                </Form.Group>
                            </Form.Row>
                        </Card>
                        <Button onClick={onLogOut}>Logout</Button>
                    </Container>
                    </Col>
                <Col>
                <h2>Twitterfeed</h2>
                    <Container>
                        { fetchTweets.map((item, index) => (
                            <Card key={index}>
                                <Card.Body>
                                    <Card.Title>{item.tweet}</Card.Title>
                                    <Card.Text>
                                        Datum: {item.createdAt} av {auth.data.username}
                                    </Card.Text>               
                                </Card.Body>
                            </Card>
                        )) }
                    </Container>
                    </Col>
            </Row>
            </>
        )
    }

export default HomePage