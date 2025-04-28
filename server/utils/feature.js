const jwt = require("jsonwebtoken");

exports.cookieOption = {
    maxAge: 15 * 24 * 60 * 60 * 1000, 
    sameSite: "none", 
    httpOnly: true,    
    secure: true, 
}
exports.sendtoken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d' 
    });

    return res
        .status(code)
        .cookie("assignment", token,exports.cookieOption) // Send token as cookie
        .json({
            success: true,
            token,
            message,
            user
        });
};
