const express = require('express')
const {connectToMongoDB} =  require('./db')

const PORT = 7000;
const app = express();

// temporarily disabled to allow easy testing of home page
connectToMongoDB()


app.get('/', (req,res)=>{
    res.status(200).json({
        status: "true",
        message: "Welcome to Japa API"
    })
})

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});



module.exports = app