const express = require('express');
const bodyParser  = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const router = require('./router/router');

require('./db/conn');
require('./db/schemas');

require('dotenv').config();
const app = express();

app.use(router);
app.use(express.json());
app.use(cors());
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

const port = 8080;
app.listen(port, ()=>{
    console.log("server listening at port 8080");
})