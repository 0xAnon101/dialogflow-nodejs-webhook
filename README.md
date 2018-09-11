# dialogflow-nodejs-webhook
There are different ways  to call the api.ai or dialogflow . But for this demo , we will be using one of the method  to define  a custom webhook to call the dialogflow with a response from our _Express Server_ .

Here's the documentation :
## Express
[🔥 Express](https://expressjs.com)
[:rocket: Serveo](https://serveo.net/)

First create a Express server on ```index.js```

```javascript
const express= require('express');
const app =  express();
require('./routes')(app);

const PORT = process.env.PORT  || 3000;
const serveoPORT  = "<<Put_your_serveo_url>>";
app.listen(PORT  ,() =>  {
    console.log(`The ngrok server is  ${serveoPORT} \n express server is listening on ${PORT}`)
})

```
Then create a single POST route for the webhook on ```routes.js``` and include it in ```index.js``` (look above :metal: )

```Use  **node_fetch** for making async request to third party library to get some data```
```javascript

const fetch = require('node-fetch');
module.exports = (app) => {

    app.post('/moviebot/get-movie-details', (req, res) => {
                      fetch('<<your_external_url>.')
                        .then( data => {
                          res.json({
                              "fulfillmentText": data,
                              "source": "get-top-rated-movies"
                          });
                       }).catch(error => console.log(error.message));
                
        });
}

```
Here the response key  I am sending is predefined by the dialogflow fulfillment API
```javascript
  res.json({
          "fulfillmentText": data,
          "source": "get-top-rated-movies"
       });
  ```
 It does have other key value pair too for sending *Rich text messages* into the Dialgflow api 
 Here's the Different type of Response you can send through your *res.json()*  call : 
 
 [:rocket: DialogFlow Docs](https://dialogflow.com/docs/fulfillment/how-it-works)  Look upon the v2 API.
 
 
 
 Next step, is to install serveo:  
 [:tada: Serveo ](https://serveo.net/) 
 
 ## Serveo
 Serveo is an SSH server just for remote port forwarding. When a user connects to Serveo, they get a public URL that they can use to connect to their localhost server , in this case it's our local Express Server , to tunnel all the public request to Severo URL from dialogflow fulfillment endpoint.
 We will mention the Public URL in Dialogflow as our endpoint ```flows control to --->``` Express server running.
 
 Run: 
 
 ```ssh -R 80:localhost:3000 serveo.net```
 
 That's it . 
 You have completely set up your nodejs  webhook .
 Good luck Exploring , 
 Thanks.
 
