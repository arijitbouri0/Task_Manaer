const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Make sure you have this model
const {sendtoken }= require('../utils/feature'); 
const cookieOption=require('../utils/feature'); // 
// Register user
exports.register = async (req, res,next) => {
  const { email, password } = req.body;
    try {

      if (!email) {
        return res.status(400).json({ message: 'email is required' });
      }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword
    });

    const savedUser = await user.save();
    sendtoken(res, savedUser, 201, "user created successfully")
  } catch (error) {   
    res.status(500).json({ message: error.message });
  }
};

// Login user
exports.login = async (req, res,next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    sendtoken(res, user, 201, `Welcome Back , ${user.email}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout user
exports.logout = async (req, res) => {
  console.log("hello")
  res.status(200).cookie("assignment", "", { ...cookieOption, maxAge: 0 })
      .json({
          success: true,
          message: "Logged out succesfully"
      })
}

// Get User Profile
exports.getMyProfile = async (req, res,next) => {
  if (!req.user) {
    return res.status(400).json({ message: 'Please Login' });
  }

  try {
    const user = await User.findById(req.user).select("-password");
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
