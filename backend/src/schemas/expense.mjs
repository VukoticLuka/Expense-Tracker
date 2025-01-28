import mongoose from 'mongoose';
import userModel from './user.mjs';
import { CategoryEnum, CurrencyEnum, ExpenseStatusEnum } from './enums.mjs';

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
        minLength: [1, 'Product name cannot be empty!']
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
    status: {
        type: String,
        enum: Object.values(ExpenseStatusEnum),
        default: ExpenseStatusEnum.UNPAID
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

//adding combined unique index to expenses
expenseSchema.index({user_id: 1, product: 1, price: 1, date: 1}, {unique: true});

const expenseModel = mongoose.model('Expense', expenseSchema);

export default expenseModel;