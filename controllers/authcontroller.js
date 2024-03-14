import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "za5232208@gmail.com",
    pass: "vyte whll dnyg pxlo",
  },
});

export const RegisteredUser = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, invitationcode } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Save verification code to the database
    const newUser = new User({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      invitationcode,
      verificationCode,
    });
    await newUser.save();

    // Send verification email
    const mailOptions = {
      from: "za5232208@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Your verification code is: ${verificationCode}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

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
        isVerified: user.isVerified,
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

export const verifyUser = async (req, res) => {
  try {
    const { verificationCode } = req.body;
    console.log(verificationCode);
    // Find the user by email
    const user = await User.findOne({ verificationCode });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the verification code matches
    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // Update user's verification status
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error("Error verifying user:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", errmsg: error.message });
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
