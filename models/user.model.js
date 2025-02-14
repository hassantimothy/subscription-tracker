// models/user.model.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [, 'User Name is required'],
        trim: true,
        maxlength: 32,
        minLength: 3
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, "User Password is required"],
        minLength: 6,
    }
    
},
{timestamps: true}
);


const User =  mongoose.model('User', userSchema);

export default User;