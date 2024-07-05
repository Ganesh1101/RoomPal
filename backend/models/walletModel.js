const mongoose = require('mongoose');
const User = require('./userModel');
const walletSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: false,
        default: 0,
    },
    transactions: [
        {
            type: {
                type: String,
                enum: ['credit', 'debit'],
                required: false,
            },
            amount: {
                type: Number,
                required: false,
            },
            date: {
                type: Date,
                default: Date.now,
            },
            description: {
                type: String,
            },
        },
    ],
}, { timestamps: true, versionKey: false });
const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;