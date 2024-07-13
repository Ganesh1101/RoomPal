const User = require("../models/userModel");
const baseResponses = require("../helpers/baseResponses");
module.exports = {
  getUserbyMobile: (req, res) => {
    const { mobileNumber } = req.body;
    if (!mobileNumber) {
      return res
        .status(400)
        .json(baseResponses.constantMessages.ALL_FIELDS_REQUIRED());
    }
    const user = User.findOne({ mobileNumber: mobileNumber });
    if (!user) {
      return res
        .status(404)
        .json(baseResponses.constantMessages.USER_NOT_FOUND());
    }
    console.log(user);
    return res.status(200).json(baseResponses.success(user));
  },
  updateUser:async (req, res)=>{
    try {
        const {  fullName, email, dateOfBirth, gender, makeMobilePrivate } = req.body;
        const  mobileNumber  = req.query;
        const user = User.findOne({ mobileNumber: mobileNumber });
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (mobileNumber && !user.makeMobilePrivate) user.mobileNumber = mobileNumber; // Only update mobileNumber if it's not private
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (gender) user.gender = gender;
    if (makeMobilePrivate !== undefined) user.makeMobilePrivate = makeMobilePrivate;

    await user.save();

    res.status(200).json({ success: true, message: 'Profile updated successfully', data: user });
} catch (error) {
    res.status(500).json({ success: false, message: error.message });
}
  },
  getAll: (req, res) => {
    const users = User.find();
    if (!users) {
      return res
        .status(404)
        .json(baseResponses.constantMessages.USER_NOT_FOUND());
    }
    return res.status(200).json(baseResponses.success(users));
  }
};
