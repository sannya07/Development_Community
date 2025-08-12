import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import profileModel from "../models/profileModel.js";

export const generateToken=(user)=>{
    return jwt.sign({user},process.env.JWT_SECRET)
}
export const registerUser=async(req,res)=>{
    const {firstname, lastname, email, password}=req.body;
    // api-level validation
    if(!firstname || !lastname || !email || !password){
        res.status(400).send({"message":"Please add all mandatory fields"})
    }

    // check if user already exists or not
    const exisitingUser=await User.findOne({email});
    if(exisitingUser){
        res.status(400).json("Already exists",exisitingUser);
    }

    const hashedPassword=await bcrypt.hash(password,10);
    // create user
    const newUser=await User.create({
        firstname,
        lastname,
        email,
        password:hashedPassword
    })

    await newUser.save();
    const token=generateToken(newUser);

    res.status(201).json(
        {
            message:"user created!",
            token
        }

    )
}

export const loginUser=async(req,res)=>{
    const{email, password}=req.body;
    // validation
    if(!email || !password){
        return res.status(400).json({message:"Add all details"});
    }
    const userExists=await User.findOne({email});
    console.log(userExists);
    if(!userExists){
        return res.status(400).json({message:"No user Found"});
    }
    const isValid=await bcrypt.compare(password,userExists.password);

    if(req.body.password!=userExists.password){
        console.log(req.body.password);
        return res.status(400).json({message:"Incorrect password"});
    }
    const token=generateToken(userExists);
    return res.status(200).json({message:'Logged in',token})
}

