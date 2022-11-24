const express = require('express')
const userRouter = express.Router()

const userController =  require('../controllers/user.controller')

userRouter.post('/signup', userController.userSignup)
userRouter.post('/login', userController.userLogin)

module.exports= userRouter