import mongoose from "mongoose";


function lengthValidator(min, max){
    return {
        validator: v => v.length >= min && v.length <= max,
        message: props => `${props.value} must be between ${min} and ${max} characters`
    }
}

const userSchema = new mongoose.Schema({
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
        enum: ["USD", "EUR", "RSD"],
        default: "EUR"
    },
    balance: {
        type: Number,
        default: 0,
        validate: {
            validator: (value) => value >= 0,
            message: (props) => `${props.value} must be higher or equal 0. Cannot be negative`
        }
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },

});


const userModel = mongoose.model('User', userSchema);

export default userModel;