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

module.exports ={
    userSignup
}