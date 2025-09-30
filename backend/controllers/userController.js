import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { uploadToCloudinary } from '../middlewares/multer.js';

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Avatar image is required' });
    }

    const result = await uploadToCloudinary(req.file.buffer, 'avatars');

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      avatar: result.secure_url, 
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, name: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { id: newUser._id, username: newUser.username, email: newUser.email, avatar: newUser.avatar },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


const login = async (req, res) => {
  try {

    const {email, password} = req.body

    if(!email || !password){
      return res.status(401).json({ success: false, message: "All fields required"})
    }

    const user = await userModel.findOne({ email })
    if(!user){
      return res.status(404).json({ success: false, message: "User not found"})
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
      return res.status(401).json({ success: false, message: "Invaild credentials"})
    }

    const token = jwt.sign({ id: user._id, email: user.email, name: user.username }, process.env.JWT_SECRET, { expiresIn: '7d'})

    res.cookie('token', token, {
       httpOnly: false,
       secure: false,
       sameSite: 'Lax',
       maxAge: 7 * 24 * 60 * 60 * 1000
    })

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar
    }

    res.status(200).json({ success: true, message: "Login successful", user: userResponse, token: token})

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal Server Error"})
  }
}

const me = async(req, res) => {
  try {
    
    const user = await userModel.findById(req.user).select('-password')
    if(!user){
      return res.status(404).json({ success: false, message: "User not found"})
    }

    res.status(200).json({
      success: true,
      currentUser: user
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal Server Error"})
  }
}


const forgotPassword = async (req, res) => {
  try {
    const { emailOrUsername, newPassword } = req.body;

    if (!emailOrUsername || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await userModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { forgotPassword };
export { register, login, me}