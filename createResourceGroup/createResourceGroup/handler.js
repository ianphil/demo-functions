"use strict"
let request = require('request');
let subId = process.env.subId;

module.exports = (context, callback) => {
    let data = JSON.parse(context);
    let url = 'https://management.azure.com/subscriptions/' + subId + '/resourcegroups/' + data.name + '?api-version=2017-05-10';
    let bodyData = {"location": data.location};

    
    
    request.post('http://23.100.5.130:8080/function/accesstoken', (err, res, authToken) => {
        if (!err && res.statusCode == 200) {
            let options = {
                method: "PUT",
                url: url,
                headers: {
                  'Authorization': 'Bearer ' + authToken.trim(),
                  'Content-Type': 'application/json',
                  'Host': 'management.azure.com'
                },
                body: JSON.stringify(bodyData)
            };
    
            request(options, (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    callback(undefined, "created");
                } else {
                    callback(undefined, err);
                }
            });
        }
    });
}
