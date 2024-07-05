const User = require('../models/userModel');
const axios = require('axios');
const Wallet = require('../models/walletModel');
const { baseResponses } = require('../helpers/baseResponses');

const createWallet = async (req, res) => {
    try {
        const { user_id } = req.body
        const wallet = new Wallet({ user_id: user_id });
        await wallet.save();
        return res.status(200).json(baseResponses.constantMessages.WALLET_CREATION_SUCCESS(wallet));
    }catch(error){
        return res.status(500).json(baseResponses.constantMessages.WALLET_CREATION_ERROR())
    }
}
const addFundsToWallet = async (req,res) =>{
   try{
    const{user_id, amount} = req.body; 
    const user = await User.findById(user_id);
    if(!user){
        return res.status(404).json(baseResponses.constantMessages.USER_NOT_FOUND());               
    }
    const wallet = await Wallet.findOne({user_id:user_id});
    if(!wallet){
        return res.status(404).json(baseResponses.constantMessages.WALLET_NOT_FOUND());
    }
    try{
    wallet.balance += amount;
    wallet.transactions.push({
        type: 'credit',
        amount: amount,
        description: `${amount} added to wallet successfully`,
    });
    await wallet.save();
    return res.status(200).json(baseResponses.constantMessages.FUNDS_ADDED_TO_WALLET(wallet));
}catch(error){
    return res.status(500).json({message:`Problem occured while adding funds:${error}`})
}

    // Call Cashfree API to process the payment
    // const response = await axios.post('https://api.cashfree.com/api/v2/cftoken/order', {
    //     // Include necessary parameters as per Cashfree API documentation
    // }, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-client-id': 'TEST10123844e567d51edbee7c8a8cec44832101',
    //         'x-client-secret': 'cfsk_ma_test_42383a0c508319c6afbaaa8518324565_1b53e05d',
    //     }
    // });
    // if (response.data.status === 'OK') {
    //     // Update wallet balance
    //     wallet.balance += amount;
    //     wallet.transactions.push({
    //         type: 'credit',
    //         amount: amount,
    //         description: 'Added funds via Cashfree',
    //     });
    //     await wallet.save();
    //     return wallet;
    // } else {
    //     throw new Error('Failed to add funds');
    // }
}catch (error){
    return res.status(500).json(baseResponses.error(error.message));
}
};
module.exports = {createWallet, addFundsToWallet};










