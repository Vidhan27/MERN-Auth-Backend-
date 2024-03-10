require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const dbConnect = require('./config/dbConnect');

const authAPI = require('./apis/authAPI');
const emailAPI = require('./apis/emailAPI');

//CONNECT TO DB
dbConnect();


//BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES
app.get('/', (req, res) => {
    res.send("Hello");
});

//API
app.use("/api/auth",authAPI)
app.use("/api/email",emailAPI)

//PORT
const port = process.env.PORT || 8000;

app.listen( port, () => console.log(`Server running on port ${port}`) );
