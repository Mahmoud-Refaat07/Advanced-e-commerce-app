import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { storeRefreshToken, deleteRefreshToken } from "../lib/redis.js";
import { generateTokens } from "../lib/generateTokens.js";
import { setCookies } from "../lib/cookies.js";
import { redis } from "../lib/redis.js";

import "dotenv/config";

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password Error" });
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
    console.log("Error in signup endpoint");
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User Not Found" });

    // compare password from database
    if (!(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    // Authentication
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.log("Error in login endpoint");
    res.status(500).json({ message: error.message });
  }
};

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
    console.log("Error in logout endpoint");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  try {
    if (!refreshToken) {
      res.status(401).json({ message: "No Refresh Token provided" });
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const storedToken = await redis.get("refresh_token:" + decoded.userId);

    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res
      .status(200)
      .json({ accessToken, message: "Token refreshed successfully" });
  } catch (error) {
    console.log("Error in refreshToken endpoint " + error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log("Error in getProfile endpoint");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
