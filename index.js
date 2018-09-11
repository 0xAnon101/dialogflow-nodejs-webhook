const express= require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app =  express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/routes')(app);





const PORT = process.env.PORT  || 3000;
const ngrokPORT  = "http://127.0.0.7:4040";
app.listen(PORT  ,() =>  {
    console.log(`The ngrok server is listening on ${ngrokPORT} \n The express server is listening on ${PORT}`)
})