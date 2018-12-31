// Require objects.
var express = require('express');
var app     = express();

// Sending RAW email including an attachment.
app.get('/send', function (req, res) {
    var AWS = require('aws-sdk');
    // Set the region 
    AWS.config.update({accessKeyId: 'AccessKey',
    secretAccessKey: 'SecretKey',region: 'us-east-1'});
    
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
