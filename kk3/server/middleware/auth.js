const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const userModel = require("../models/users");

exports.loginCheck = (req, res, next) => {
  try {
    // Check for token in both 'token' and 'authorization' headers
    let token = req.headers.token || req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        error: "You must be logged in",
      });
    }

    // Remove 'Bearer ' prefix if present
    if (token.startsWith('Bearer ')) {
      token = token.replace("Bearer ", "");
    }

    const decode = jwt.verify(token, JWT_SECRET);
    req.userDetails = decode;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({
      error: "You must be logged in",
    });
  }
};

exports.isAuth = (req, res, next) => {
  let { loggedInUserId } = req.body;
  if (
    !loggedInUserId ||
    !req.userDetails._id ||
    loggedInUserId != req.userDetails._id
  ) {
    res.status(403).json({ error: "You are not authenticate" });
  }
  next();
};

exports.isAdmin = async (req, res, next) => {
  try {
    // Get user ID from either req.body.loggedInUserId or req.userDetails._id
    const userId = req.body.loggedInUserId || req.userDetails._id;

    if (!userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    let reqUser = await userModel.findById(userId);

    if (!reqUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // If user role 0 that's mean not admin/employee it's customer
    if (reqUser.userRole === 0) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch (error) {
    console.error("Admin check error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.isEmployee = async (req, res, next) => {
  try {
    // Get user ID from either req.body.loggedInUserId or req.userDetails._id
    const userId = req.body.loggedInUserId || req.userDetails._id;

    if (!userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    let reqUser = await userModel.findById(userId);

    if (!reqUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user is employee (role 2)
    if (reqUser.userRole !== 2) {
      return res.status(403).json({ error: "Employee access required" });
    }
    next();
  } catch (error) {
    console.error("Employee check error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.isAdminOrEmployee = async (req, res, next) => {
  try {
    // Get user ID from either req.body.loggedInUserId or req.userDetails._id
    const userId = req.body.loggedInUserId || req.userDetails._id;

    if (!userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    let reqUser = await userModel.findById(userId);

    if (!reqUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user is admin (role 1) or employee (role 2)
    if (reqUser.userRole !== 1 && reqUser.userRole !== 2) {
      return res.status(403).json({ error: "Admin or Employee access required" });
    }
    next();
  } catch (error) {
    console.error("Admin/Employee check error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.isAdminOnly = async (req, res, next) => {
  try {
    // Get user ID from either req.body.loggedInUserId or req.userDetails._id
    const userId = req.body.loggedInUserId || req.userDetails._id;

    if (!userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    let reqUser = await userModel.findById(userId);

    if (!reqUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user is admin (role 1) only
    if (reqUser.userRole !== 1) {
      return res.status(403).json({ error: "Admin access required" });
    }
    next();
  } catch (error) {
    console.error("Admin check error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};