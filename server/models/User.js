const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    emailverificationToken:{
        type:String,
        default: "",
    },
    verified:{
        type:Boolean,
        default:false
    },
}, {timestamps: true});

module.exports = mongoose.model('User1', userSchema);