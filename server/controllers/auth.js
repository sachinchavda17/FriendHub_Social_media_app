import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { v2 as cloudinary } from 'cloudinary';
// Register user

cloudinary.config({
  cloud_name: 'dbm00gxt1',
  api_key: '649676767687716',
  api_secret: 'XeCmlNwb-MNKflThxJcgSCvUmv0'
});


export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      location,
      friend,
      occupation,
    } = req.body;

    console.log("picturePath", picturePath)

    if (!password) {
      return res.status(400).json({ err: "Password is required" });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      location,
      friend,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impression: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    console.log("created user", savedUser)
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};



// Helper function to upload image to Cloudinary

const uploadImageToCloudinary = async (picturePath) => {
  try {
    const result = await cloudinary.uploader.upload(picturePath);
    return result.secure_url;
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary");
  }
};

// login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    //   console.log(user)
    // const userObject = user.toObject(); // Convert Mongoose document to plain JavaScript object
    // delete userObject.password; // Delete password field from the object
    // res.status(200).json({ token, user: userObject }); // Send the modified user object in the response

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
