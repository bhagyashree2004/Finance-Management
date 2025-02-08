import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        default: ''
    },

    currency: {
        type: String,
        required: true,
        default: 'INR'  // Default currency can be set as USD
    },
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;