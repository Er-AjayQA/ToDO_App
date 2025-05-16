// Imports & Configs
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../api/UserManagement/Model/user.model");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Token not found!!",
    });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err)
      return res.status(403).json({
        success: false,
        message: "Invalid User!!",
      });

    const dbUserExist = await UserModel.findById(user.id);

    if (!dbUserExist) {
      return res.status(404).json({
        success: false,
        message: "User not found!!",
      });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
