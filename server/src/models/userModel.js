import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Name is required'],
        trim: true,
        maxLength: [50, 'name cannot exceed 50 characters '] 
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
}, {
    timestamps: true,
    versionKey: false
})

export const User = mongoose.model('User', userSchema)