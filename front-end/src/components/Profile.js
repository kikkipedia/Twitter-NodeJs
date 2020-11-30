import React, {useState, useContext} from 'react'
import {Form, Button, Col, Card} from "react-bootstrap"
import {authContext} from '../context/AuthContext'

//TODO
const Profile = () => {

    const [tweet, setTweet] = useState()
    const {auth} = useContext(authContext)

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
            console.log("success")
        }).catch(error => {
            console.log(error)
        })
    }
    
        return(
            <div>
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
            </div>
        )
    }
export default Profile