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