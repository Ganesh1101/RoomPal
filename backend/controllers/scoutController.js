const Scout = require('../models/scoutsModel');

const ScoutRegister = async (req, res) => {
  try {
    let {
      fullName,
      mobileNumber,
      location: { latitude, longitude },
      password,
      confirmPassword,
    } = req.body;
    if (
      !fullName ||
      !mobileNumber ||
      !gender ||
      !password ||
      !confirmPassword ||
      !location 
    ) {
      return res
        .status(400)
        .json(baseResponses.constantMessages.ALL_FIELDS_REQUIRED());
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json(baseResponses.constantMessages.PASSWORD_MISMATCH());
    }
    const scout = await Scout.findOne({ mobileNumber: mobileNumber });
    if (scout) {
      return res
        .status(400)
        .json(baseResponses.constantMessages.MOBILE_NUMBER_ALREADY_EXISTS());
    }

    gender = gender.toLowerCase();
    const newscout = new Scout({
        fullName,
        mobileNumber,
        location: { lat:latitude, lon:longitude },
        password,
        confirmPassword,
    });
    await newscout.save();
    return res
      .status(200)
      .json(baseResponses.constantMessages.SCOUT_REGISTERED());
  } catch (error) {
    console.log(error);
    return res.status(500).json(baseResponses.error(error.message));
  }
};

const getAllScouts = async (req, res) => {
    try {
        const recLimit = parseInt(req.query.limit) || 10;
        const pageNumber = parseInt(req.query.page) || 1;
        const count = await Scout.countDocuments();
        const totalPages = Math.ceil(count / recLimit);
        const roomsList = await Scout.find()
            .skip((pageNumber - 1) * recLimit)
            .limit(recLimit)
            .lean();

        res.status(200).json({
            success: true,
            totalPages,
            totalCount: count,
            data: roomsList
        });
    } catch (error) {
        res.status(500).json(baseResponses.error(error.message));
    }
};
module.exports ={ScoutRegister, getAllScouts}