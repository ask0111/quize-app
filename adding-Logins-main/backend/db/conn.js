require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://auth:${process.env.dbpass}@cluster0.9wbpvu1.mongodb.net/intern?retryWrites=true&w=majority`,
    {useNewUrlParser : true})
    .then(console.log('Connected successfully'))
    .catch(err=>{
        console.log(err);
    });



