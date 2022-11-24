const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema =  mongoose.Schema

const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},
{collection:'User'}
)

//hashing passwords for security
UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        
        //to stop unnecessary password rehashing
        if (!user.isModified('password')){return next()}

        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);

//checking if password is correct during login
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;