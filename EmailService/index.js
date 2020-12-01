const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-north-1'})
const sqs = new AWS.SQS({apiVersion: "2012-11-05"})
const queueUrl = "https://sqs.eu-north-1.amazonaws.com/951445330328/emailQueue"

//get email from frontend
exports.getEmail = async (event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {
    let data = JSON.parse(event.body)
    return sendRes(200, '{"message": "to: " '+ data + '}'), 
    sendSqs(data)
  }
}

const sendRes = (status, body) => {
  var response = {
      statusCode: status,
      headers: {
          "Content-Type" : "application/json",
          "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Methods" : "OPTIONS,POST",
          "Access-Control-Allow-Credentials" : true,
          "Access-Control-Allow-Origin" : "*",
          "X-Requested-With" : "*"
      },
      body: body
  };
  return response;
}

const sendSqs = (email) => {
  const subject = "new email"
  const body = "this is an email"
  const params = {
    "MessageBody": JSON.stringify({
      to: email,
      subject: subject,
      body: body
    }),
    "QueueUrl": queueUrl
  }
  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log("There was an Error: ", err);
    } else {
      console.log("Successfully added message to queue", data.MessageId);
    }
  })
}