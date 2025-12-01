import User from "../models/user.model.js";
import "dotenv/config";
import { storeRefreshToken } from "../lib/redis.js";
import { generateTokens } from "../lib/generateTokens.js";
import { setCookies } from "../lib/cookies.js";

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
export const logout = async (req, res) => {};
