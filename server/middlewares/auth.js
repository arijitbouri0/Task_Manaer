const jwt = require('jsonwebtoken');

// Protect routes with this middleware
exports.protect = async (req, res, next) => {

  try {
    // Retrieve the token from the cookies
    const token = req.cookies["assignment"];
    if (!token) {
      return res.status(401).send({ message: "Please login to access this route" });
    }

    // Verify the token
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user data to the request object
    req.user = decodeData._id;
    next();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
