import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const RegisteredUser = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, invitationcode } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ phonenumber });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this Phone number" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate a 6-digit verification code

    // Save verification code to the database
    const newUser = new User({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      invitationcode,
    });
    await newUser.save();

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", errmsg: error.message });
  }
};

export const LoginUser = async (req, res) => {
  let token; // Declare the token variable
  try {
    const { phonenumber, password } = req.body;

    // Find user by phonenumber
    const user = await User.findOne({ phonenumber });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare hashed passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Password didn't match" });
    }
    // Generate JWT token
    token = jwt.sign(
      {
        user_id: user._id,
        fullname: user.fullname,
        isAdmin: user.isAdmin,
      },
      "8923r4u9832u423iu",
      { expiresIn: "1d" }
    );

    res
      .cookie("lInfo", token, {
        secure: true, // Set the Secure flag for HTTPS
        sameSite: "None", // Expire token in just one hour
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        id: user._id,
        token: token,
        fullname: user.fullname,
        email: user.email,
        phonenumber: user.phonenumber,
        isAdmin: user.isAdmin,
        frozenAmount: user.frozenamount,
        orderQuantity: user.orderquantitiy,
        availableBalance: user.availableBalance,
      });
  } catch (error) {
    console.log(error.message);
    console.error("Error during login:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};

export const Logout = async (req, res) => {
  try {
    // Clear the "lInfo" cookie
    res.clearCookie("lInfo");
    // You can also send a response indicating successful logout
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
