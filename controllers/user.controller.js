const userModel = require('../models/userModel')
const passport = require('passport');

async function userSignup(req,res,next) {
    passport.authenticate('signup', async(error,user) =>{
        if (error){
            return res.status(400).json({
                status: false,
                message: "Signup failed",
                error
            })
        }
        res.status(201).json({
            status: true,
            message: 'Signup successful',
            user
    
        })
    })(req,res,next)
    

}

async function userLogin(req,res,next){
    passport.authenticate('login', async(user, message) =>{
        if (!user){
            return res.status(400).json({
                status: false,
                message: message,
            })
        }
        res.status(201).json({
            status: true,
            message: message,
            user
    
        })
    })(req,res,next)

}
module.exports ={
    userSignup,
    userLogin
}