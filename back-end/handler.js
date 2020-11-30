'use strict';
const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10'})
const uuid = require('uuid').v4

const userTable = process.env.USER_TABLE

function response(statusCode, message) {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    statusCode: statusCode,
    body: JSON.stringify(message)
  }
}

//Create user
module.exports.createUser = (event, context, callback) => {
  const reqBody = JSON.parse(event.body)
  const emptyTweets = [{}]
  const user = {
    id: uuid(),
    username: reqBody.username,
    password: reqBody.password,
    email: reqBody.email,
    tweets: emptyTweets,
  }
  return db.put({
    TableName: userTable,
    Item: user
  }).promise().then(() => {
    callback(null, response(201, user))
  })
  .catch(err => response(null, response(err.statusCode, err)))
}
// Get all
module.exports.getAllUsers = (event, context, callback) => {
  return db.scan({
    TableName: userTable
  }).promise().then(res => {
    callback(null, response(200, res.Items))
  })
  .catch(err => callback(null, response(err.statusCode, err)))
}
// Get one
module.exports.getUser = (event, context, callback) => {
  const id = event.pathParameters.id
  const params = {
    Key: {id: id},
    TableName: userTable
  }
  return db.get(params).promise()
  .then(res => {
    if(res.Item) callback(null, response(200, res.Item))
    else callback(null, response(404, {error: 'User not found'}))
  })
  .catch(err => callback(null, response(err.statusCode, err)))
}
//Update
// module.exports.updateUser = (event, context, callback) => {
//   const id = event.pathParameters.id
//   const body = JSON.parse(event.body)
//   const paramName = body.paramName
//   const paramValue = body.paramValue
//   const params = {
//     Key: {id: id},
//     TableName: userTable,
//     ConditionExpression: 'attribute_exists(id)',
//     UpdateExpression: 'set ' + paramName + ' = :v',
//     ExpressionAttributeValues: {
//       ':v': paramValue
//     },
//     ReturnValue: 'ALL_NEW'
//   }
//   return db.update(params)
//   .promise()
//   .then(res => {
//     callback(null, response(200, res))
//   })
//   .catch(err => callback(null, response(err.statusCode, err)))
// }
//Delete
module.exports.deleteUser = (event, context, callback) => {
  const id = event.pathParameters.id
  const params = {
    Key: {id: id},
    TableName: userTable
  }
  return db.delete(params)
  .promise()
  .then(() => callback(null, response(200, {message: 'User deleted'})))
  .catch(err => callback(null, response(err.statusCode, err)))
}