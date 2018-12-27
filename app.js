// Require objects.
var express = require('express');
var app     = express();
// var aws     = require('aws-sdk');

// Edit this with YOUR email address.
// var email   = "hello@example.com";
    
// Load your AWS credentials and try to instantiate the object.
// aws.config.loadFromPath(__dirname + '/config-sample.json');

// Instantiate SES.
// var ses = new aws.SES();

// Verify email addresses.
// app.get('/verify', function (req, res) {
//     var params = {
//         EmailAddress: email
//     };
    
//     ses.verifyEmailAddress(params, function(err, data) {
//         if(err) {
//             res.send(err);
//         } 
//         else {
//             res.send(data);
//         } 
//     });
// });

// // Listing the verified email addresses.
// app.get('/list', function (req, res) {
//     ses.listVerifiedEmailAddresses(function(err, data) {
//         if(err) {
//             res.send(err);
//         } 
//         else {
//             res.send(data);
//         } 
//     });
// });

// // Deleting verified email addresses.
// app.get('/delete', function (req, res) {
//     var params = {
//         EmailAddress: email
//     };

//     ses.deleteVerifiedEmailAddress(params, function(err, data) {
//         if(err) {
//             res.send(err);
//         } 
//         else {
//             res.send(data);
//         } 
//     });
// });

// Sending RAW email including an attachment.
app.get('/send', function (req, res) {
    var AWS = require('aws-sdk');
    // Set the region 
    AWS.config.update({accessKeyId: 'AKIAIXJTML3EDMLMATQQ',
    secretAccessKey: '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',region: 'us-east-1'});
    
    // Create sendEmail params 
    var params = {
      Destination: { /* required */
        CcAddresses: [
          'tahashin@erainfotechbd.com',
          /* more items */
        ],
        ToAddresses: [
          'nhossain@erainfotechbd.com',
          /* more items */
        ]
      },
      Message: { /* required */
        Body: { /* required */
          Html: {
           Charset: "UTF-8",
           Data: "HTML_FORMAT_BODY"
          },
          Text: {
           Charset: "UTF-8",
           Data: "TEXT_FORMAT_BODY"
          }
         },
         Subject: {
          Charset: 'UTF-8',
          Data: 'Test email with nodejs'
         }
        },
      Source: 'noreply@honeygram.co', /* required */
      ReplyToAddresses: [
          'noreply@honeygram.co',
        /* more items */
      ],
    };       
    
    // Create the promise and SES service object
    new AWS.SES({"Statement": [{  "Effect":"Allow",  "Action":"ses:SendRawEmail",  "Resource":"*"}]}).listVerifiedEmailAddresses(function(err, data) {
                if(err) {
                    res.send(err);
                } 
                else {
                    res.send(data);
                } 
            });

});

// Start server.
var server = app.listen(3352, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('AWS SES example app listening at http://%s:%s', host, port);
});



// Load the AWS SDK for Node.js
