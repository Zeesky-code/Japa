const express = require('express')
const bodyParser = require('body-parser')
const userRoute  = require('./routes/user.route')
const passport = require('passport')

const app = express();

require('./middlewares/auth')
const {connectToMongoDB} =  require('./db')

connectToMongoDB()

app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended:false}))

app.use('/user', userRoute)

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