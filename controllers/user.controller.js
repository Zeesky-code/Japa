const userModel = require('../models/userModel')
async function userSignup(req,res,next) {
    const user = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }
    try{
        const newUser = await userModel.create(user);

        return res.status(201).json({
            status: false,
            message: "Signup successful",
            newUser
        })
    }catch(error){
        return res.status(401).json({
            status: false,
            message: "Signup failed",
            error

        })
    }
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
    console.log(validate)
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