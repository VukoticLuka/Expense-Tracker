import mongoose from "mongoose";
import { CurrencyEnum } from "./enums.mjs";


function lengthValidator(min, max){
    return {
        validator: v => v.length >= min && v.length <= max,
        message: props => `${props.value} must be between ${min} and ${max} characters`
    }
}

export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        validate: lengthValidator(4,32),
        required: [true, 'username is required']
    },
    firstName: {
        type: String,
        validate: lengthValidator(4,32),
        required: [true, 'firstName is required']
    },
    lastName: {
        type: String,
        validate: lengthValidator(4,32),
        required: [true, 'lastName is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please enter a valid email'
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    currency: {
        type: String,
        enum: Object.values(CurrencyEnum),
        default: "EUR"
    },
    balance: {
        type: Number,
        default: 0,
        min: [0, 'Balance cannot be negative']
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },

}, {
    toJSON: {
        transform: function(doc,ret){
            delete ret.password;
            delete ret.__v;
            delete ret._id;
        }
    },
    toObject: {
        transform: function(doc,ret){
            delete ret.__v;
            delete ret.password;
        }
    }
});


const userModel = mongoose.model('User', userSchema);

export default userModel;