'use strict';
const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10'})
const moment = require('moment')
const userTable = process.env.USER_TABLE

function response(statusCode, message) {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    statusCode: statusCode,
    body: JSON.stringify(message)
  }
}


//Tweets-handler

//Add tweet // only works if list is not empty :(
module.exports.makeTweet = (event, context, callback) => {
    const reqBody = JSON.parse(event.body)
    const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a')
    const id = event.pathParameters.id
    const tweet = reqBody.tweet
    
    const params = {
      TableName: userTable,
      Key: {id: id},
      ConditionExpression: 'attribute_exists(id)',
      UpdateExpression: "set #attrName = list_append(if_not_exists(#attrName, :empty_list), :t)",
      ExpressionAttributeNames: {
        "#attrName": "tweets",
      },
      ExpressionAttributeValues: {
          ":t": [{"createdAt": timestamp, "tweet": tweet}],
          ":empty_list": []
      },
      ReturnValues:"UPDATED_NEW"
    }
    return db.update(params)
    .promise()
    .then(res => {
      // if(res.Item.tweet.includes("#email")) {
      //   const email = res.Item.email
      //   sendToQueue(email)
      //   console.log("queue sent")
      // }
        callback(null, response(200, res))
    })
    .catch(err => callback(null, response(err.statusCode, err)))
  }
  //Get all tweets from one user
  module.exports.getTweets = (event, context, callback) => {
    const id = event.pathParameters.id
    const params = {
      Key: {id: id},
      TableName: userTable
    }
    return db.get(params).promise()
    .then(res => {
      if(res.Item) callback(null, response(200, res.Item.tweets))
      else callback(null, response(404, {error: 'User not found'}))
    })
    .catch(err => callback(null, response(err.statusCode, err)))
  }