"use strict"
let request = require('request');
let subId = process.env.subId;

module.exports = (context, callback) => {
    let data = JSON.parse(context);
    let url = 'https://management.azure.com/subscriptions/' + subId + '/resourcegroups/' + data.name + '?api-version=2017-05-10';
    
    request.post('http://23.100.5.130:8080/function/accesstoken', (err, res, authToken) => {
        if (!err && res.statusCode == 200) {
            let options = {
                method: "DELETE",
                url: url,
                headers: {
                  'Authorization': 'Bearer ' + authToken.trim(),
                  'Content-Type': 'application/json',
                  'Host': 'management.azure.com'
                }
            };
    
            request(options, (err, res, body) => {
                if (err) {
                    callback(undefined, "ERROR: " + err);
                }
                
                callback(undefined, "SUCCESS: " + body);
            });
        }
    });
}
