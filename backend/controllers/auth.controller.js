import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { storeRefreshToken, deleteRefreshToken } from "../lib/redis.js";
import { generateTokens } from "../lib/generateTokens.js";
import { setCookies } from "../lib/cookies.js";

import "dotenv/config";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    user.password = undefined;

    // Authentication
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(200).json({ message: "User Created Sucessfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      await deleteRefreshToken(decoded.userId);

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      res.json({ message: "Logout Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
