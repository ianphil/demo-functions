"use strict"
let request = require('request');

let client_id = process.env.client_id;
let client_secret = encodeURIComponent(process.env.client_secret);
let resource = encodeURIComponent(process.env.resource);
let url = 'https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/token';
let body = {body:'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret + '&resource=' + resource};

module.exports = (context, callback) => {
    request.post(url, body, function(err, res, body){
        if(err){
            callback(undefined, err.message);
        }

        body = JSON.parse(body);
        callback(undefined, body.access_token);
    });
}
