const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { baseResponses } = require('../helpers/baseResponses');
const Register = async (req,res)=>{
    try{
       let {
            fullName,
            email,
            mobileNumber,
            dateOfBirth,
            gender,
            lookingForRoom,
            lookingForRoommate,
            preferences,
            makeMobilePrivate,
            password,
            confirmPassword
        }=req.body;
        if (!fullName || !email || !mobileNumber || !dateOfBirth || !gender || 
            lookingForRoom === undefined || lookingForRoommate === undefined || 
            !password || !confirmPassword) {
          return res.status(400).json(baseResponses.constantMessages.ALL_FIELDS_REQUIRED);
        }
        if(password!==confirmPassword){
            return res.status(400).json(baseResponses.constantMessages.PASSWORD_MISMATCH());
        }
        gender=gender.toLowerCase();
        const newuser = new User({
            fullName,
            email,
            mobileNumber,
            dateOfBirth,
            gender,
            lookingForRoom,
            lookingForRoommate,
            preferences,
            makeMobilePrivate,
            password
        });
        await newuser.save();
        return res.status(200).json(baseResponses.constantMessages.USER_REGISTERED());
    }catch (error){
        return res.status(500).json(baseResponses.error(error.message));
    }
};
const SignIn = async (req, res) => {
    try {
        const { mobileNumber, password } = req.body;

        // Validate required fields
        if (!mobileNumber || !password) {
            return res.status(400).json(baseResponses.constantMessages.ALL_FIELDS_REQUIRED());
        }

        // Find user by mobile number
        const user = await User.findOne({ mobileNumber });
        if (!user) {
            return res.status(400).json(baseResponses.constantMessages.USER_NOT_FOUND());
        }

        if (user.password !== password) {
            return res.status(400).json(baseResponses.constantMessages.INVALID_PASSWORD());
        }

        let _secret = process.env.JWT_SECRET || 'rajasekhar-secret-key'; // Ensure this key is correct and secure
        const token = jwt.sign({ mobileNumber:123467890 }, _secret, { expiresIn: '1h' });
        console.log(token);

        return res.status(200).json(baseResponses.constantMessages.USER_LOGGED_IN(token));
    } catch (error) {
        console.error("SignIn error:", error); // Log error for debugging
        return res.status(500).json(baseResponses.error(error.message));
    }
};


const resetPassword = async (req, res) => {
    try {
        const { mobileNumber, newPassword, confirmPassword, resetToken } = req.body;

        if (!newPassword || !confirmPassword || !mobileNumber || !resetToken) {
            return res.status(400).json(baseResponses.constantMessages.ALL_FIELDS_REQUIRED());
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json(baseResponses.constantMessages.PASSWORD_MISMATCH());
        }

        // Verify the reset token
        const _secret = process.env.JWT_SECRET || 'rajasekhar-secret-key';
        try {
            jwt.verify(resetToken, _secret);
        } catch (error) {
            return res.status(400).json(baseResponses.constantMessages.INVALID_RESET_TOKEN());
        }

        const user = await User.findOne({ mobileNumber });
        if (!user) {
            return res.status(404).json(baseResponses.constantMessages.USER_NOT_FOUND());
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json(baseResponses.constantMessages.PASSWORD_RESET_SUCCESS());
    } catch (error) {
        return res.status(500).json(baseResponses.error(error.message));
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { mobileNumber } = req.body;

        if (!mobileNumber) {
            return res.status(400).json(baseResponses.constantMessages.ALL_FIELDS_REQUIRED());
        }

        const user = await User.findOne({ mobileNumber });
        if (!user) {
            return res.status(404).json(baseResponses.constantMessages.USER_NOT_FOUND());
        }

        const _secret = process.env.JWT_SECRET || 'rajasekhar-secret-key';
        const resetToken = jwt.sign({ mobileNumber: user.mobileNumber }, _secret, { expiresIn: '1h' });

        // Here you can send the reset token to the user's mobile number via SMS
        // For now, we'll return it in the response for simplicity
        return res.status(200).json({ resetToken });
    } catch (error) {
        return res.status(500).json(baseResponses.error(error.message));
    }
};

module.exports = { Register, SignIn, forgotPassword, resetPassword };