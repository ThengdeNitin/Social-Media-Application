import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const register = async(req,res) => {
  try{
    
    const {username, email, password} = req.body;

    if(!username || !email || !password){
      return res.status(401).json({ success: false, message: "All fields required"})
    }

    const avatarDp = req.file?.path;

    if(!avatarDp){
      return res.status(400).json({ success: false, message: "Avatar image is required"})
    }

    const existingUser = await userModel.findOne({ email })

    if(existingUser){
      return res.status(401).json({ success: false, message: "User already exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      avatar: avatarDp
    })

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name}, process.env.JWT_SECRET, { expiresIn: '7d'})

    res.cookie('token', token, {
      httpOnly: false,
      secure:false,
      sameSite:'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar
    }

    res.status(201).json({ success: true, message: "User Register successfully", user: userResponse, token: token})

  } catch(error){
    console.log(error)
    res.status(500).json({ success: false, message: "Internal Server Error"})
  }
}

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

    res.status(200).json({ success: true, message: "Login successful", user: userResponse, token: token})

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal Server Error"})
  }
}

const me = async(req, res) => {
  try {
    
    const user = await userModel.findById(req.user.select('password'))
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

export { register, login, me}