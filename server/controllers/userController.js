import User from "../models/userModel.js";
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
    // create user
    const newUser=await User.create({
        firstname,
        lastname,
        email,
        password
    })

    await newUser.save();
    res.status(201).json("user created!",{newUser})
}

