const user = require('./models/userModel')
async function userSignup(req,res,next) {
    try{
        const user = req.body
        const newUser = await UserModel.create({ email, password, first_name, last_name });
        return res.status(201).json({
            status: false,
            message: "Signup successful",
            newUser
        })
    }catch(error){
        return res.status(401).json({
            status: false,
            message: "Signup failed"
        })
    }
}

module.exports ={
    userSignup
}