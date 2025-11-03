import jwt from "jsonwebtoken";
import config from "../config/index.js";


async function generateToken(user) {
  try {
    const payload = {
      id: user.user_id,
      fullname: user.fullname,
      email: user.email,
    };

    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });
  } catch (error) {
    throw new Error("Error generating token");
  }
}


async function verifyToken(token) {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
}

async function generateRefreshToken(user) {
  try {
    const payload = {
      id: user.user_id,
      email: user.email,
    };

    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_REFRESH_EXPIRES_IN,
    });
  } catch (error) {
    throw new Error("Error generating refresh token");
  }
}

async function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
}

export default {
  generateToken,
  verifyToken,
  generateRefreshToken,
  verifyRefreshToken,
};
