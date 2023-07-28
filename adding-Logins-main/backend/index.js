const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const port = 8080;
const router = require('./routes/router');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require("dotenv").config();



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret : "A ver LONG STRING",
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 1 * 24 * 60 * 60 * 1000,
      }
}));

app.use(passport.initialize());
app.use(passport.session());
require('./db/conn');
require('./db/schemas');


app.use(router);


app.listen(port, ()=>{
    console.log("server listening at port 8080");
})

