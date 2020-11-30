const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-north-1'})
const sqs = new AWS.SQS({apiVersion: "2012-11-05"})
const queueUrl = "https://sqs.eu-north-1.amazonaws.com/951445330328/emailQueue"

const to = emailAddress //från api
const subject = "new email"
const body = "this is an email"

const params = {
  "MessageBody": JSON.stringify({
    "to": to,
    "subject": subject,
    "body": body
  }),
  "QueueUrl": queueUrl
}

// send to queue
sqs.sendMessage(params, (err, data) => {
  if (err) {
    console.log("There was an Error: ", err);
  } else {
    console.log("Successfully added message to queue", data.MessageId);
  }
});

//SQS
// function sendToQueue(email) {
//     const to = email
//     const subject = ""
//     const body = ""
//     const message = "Email sent to: " + to + " With subject: " + subject + " and body: " + body
  
//     let params = {
//       MessageAttributes: {
//         "To": {
//           DataType: "String",
//           StringValue: to
//         },
//         "Subject": {
//           DataType: "String",
//           StringValue: subject
//         },
//         "Body": {
//           DataType: "String",
//           StringValue: body
//         }
//       },
//       MessageBody: JSON.stringify(message),
//       QueueUrl: queueUrl
//     }
//     emailSqs.sendMessage(params, function(err, data) {
//       if (err) {
//         console.log("Error", err);
//       } else {
//         console.log("Success", data.MessageId);
//       }
//     })
//   }