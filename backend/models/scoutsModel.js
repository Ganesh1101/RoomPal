const mongoose = require('mongoose');
const { type } = require('os');
const scoutSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
    mobileNumber:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    location: {
        lat: {
          type: Number,
          required: false
        },
        lon: {
          type: Number,
          required: false
        }
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
    }
},{timestamps:true, versionKey:false});
const Scout = mongoose.model('scouts',scoutSchema);
module.exports = Scout;