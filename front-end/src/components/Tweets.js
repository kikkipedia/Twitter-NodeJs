import React, {useState, useContext, useEffect} from 'react'
import {authContext} from '../context/AuthContext'
import {Button,Col, Row, Container, Card} from "react-bootstrap"

// FUNKAR EJ!!!!

export const Tweets = () => {

    const {auth} = useContext(authContext)
    //const [tweets, setTweets] = useState([])
    const tweets = auth.data.tweets || [] //bara de egna tweetsen

    // useEffect(() => {
    //     const userId = auth.data.id
    //     const fetchTweets = () => {
    //         return fetch("https://1lfzbgijz6.execute-api.eu-north-1.amazonaws.com/dev/users/"+ userId + "/tweets")
    //         .then(res => setTweets(res.data))
    //     }
    //     fetchTweets()
    // }, [])

    // useEffect(() => {
    //     const userId = auth.data.id
    //     const tweetStream = auth.data.tweets
    //     console.log(tweetStream)
    //     // fetch("https://1lfzbgijz6.execute-api.eu-north-1.amazonaws.com/dev/users/"+ userId + "/tweets")
    //     // .then(res => setTweets(res.data))
    //     // console.log("tweets: " + tweets)
    // }, [])


    return(
        <div>
            
            { tweets.map((item, index) => (
            <Card key={index}>
                <Card.Body>
                <Card.Title>{item.tweet}</Card.Title>
                <Card.Text>
                Datum: {item.createdAt} av {auth.data.username}
                </Card.Text>               
                </Card.Body>
            </Card>
            )) }

        </div>
    )




    

    

}
export default Tweets