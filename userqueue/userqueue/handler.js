"use strict"
let azure = require('azure-storage');

module.exports = (context, callback) => {
    let queueSvc = azure.createQueueService();
    
    queueSvc.createQueueIfNotExists('myqueue', function(error, result, response){
        if(!error){
          // Queue created or exists
        }
    });

    queueSvc.createMessage('myqueue', "Hello world!", function(error, result, response){
        if(!error){
          // Message inserted
        }
    });

    queueSvc.peekMessages('myqueue', function(error, result, response){
        if(!error){
            callback(undefined, result.messages[0].messageText);
        }
    });
}
