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
    const user = await userModel.findOne({username: req.body.username})
    if (!user){
        return res.status(400).json({
            status: false,
            message: "This user doesn't exist"
        })
    }
    const validate  = await user.isValidPassword(req.body.password)

    if (!validate){
        return res.status(400).json({
            status: false,
            message: "Username or Password is incorrect"
        })
    }
    return res.status(200).json({
        status: true,
        message: "Login Successful"
    })
}
module.exports ={
    userSignup,
    userLogin
}