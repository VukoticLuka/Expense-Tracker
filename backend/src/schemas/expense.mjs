import mongoose from 'mongoose';
import userModel from './user.mjs';
import { CategoryEnum, CurrencyEnum } from './enums.mjs';

export const expenseSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel.modelName,
        required: true
    },
    product: {
        type: String,
        trim: true,
        required: true,
        minLength: [1, 'Prpduct name cannot be empty!']
    },
    price: {
        amount: {
            type: Number,
            required: true,
            min: [0, "Price cannot be negative value!"]
        },
        currency: {
            type: String,
            enum: Object.values(CurrencyEnum),
            required: true
        }
    },
    category: {
        type: String,
        enum: Object.values(CategoryEnum),
        required: true
    },
    date: {
        type: Date,
        required: true,
        set: (newDate) => new Date(newDate)
    },
    description: {
        type: String,
        required: false,
        maxLength: [500, "Description cannot be longer than 500 characters!"],
        default: ''
    }
},{
    timestamps: true, //Auto generation of createdAt and updatedAt
    toJSON:{
        transform: function(doc, ret){
            delete ret.createdAt;
            delete ret.__v;
        }
    },
    toObject: {
        transform: function(doc, ret){
            delete ret.__v;
        }
    }
}
);

const expenseModel = mongoose.model('Expense', expenseSchema);

export default expenseModel;