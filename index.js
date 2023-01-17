const express = require ('express');
const app = express();
const { connectDB}= require('./config/db');//imported this fuction from the /.config.db



// middlewares
app.use(express.json());
app.use(express.static('content'));
app.use(express.urlencoded({extends: false}));

const PORT = 1338;
app.listen(PORT, () =>{
    console.log('Server is running');
    connectDB();
})