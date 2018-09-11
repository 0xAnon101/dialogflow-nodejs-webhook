# dialogflow-nodejs-webhook
There are different ways  to call the api.ai or dialogflow . But for this demo , we will be using one of the method  to define  a custom webhook to call the dialogflow with a response from our _Express Server_ .

Here's the documentation :
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
                      fetch('<<your_exteranl_url')
                        .then( data => {
                          res.json({
                              "fulfillmentText": data,
                              "source": "get-top-rated-movies"
                          });
                       }).catch(error => console.log(error.message));
                
        });
}

```
