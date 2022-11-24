const userModel = require('../models/userModel')
const passport  = require('passport')
const localStrategy = require('passport-local').Strategy;

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req,username, password, done) => {
            const email = req.body.email
            try {
                const user = await userModel.create({ email, username, password});

                return done(null, user);
            } catch (error) {
                console.log(error)
                return done(error);
            }
        }
    )
)
passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req,username, password, done) => {
            let message
            const user = await userModel.findOne({username: username})
            if (!user){
                message = "User does not exist"
                return done(null, message)
            }
            const validate  = await user.isValidPassword(req.body.password)

            if (!validate){
                message = "Username or Password is incorrect"
                return done(null, message)
            }
            message = "Login successful"
            return done(user, message)
        }
    )
)