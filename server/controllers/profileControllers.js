import Profile from "../models/profileModel.js";

export const createProfile=async(req,res)=>{
    const {imageUrl,summary,skills,workExperience,linkedinUrl,githubUrl,codingPlatform,resumeUrl}=req.body;

    if(!imageUrl || !summary || !skills ||!workExperience ||!linkedinUrl || !githubUrl || !codingPlatform ||!resumeUrl){
        res.status(404).send({
            message:"Please fill all the mandatory fields"
        })
    }
    const newProfile=await Profile.create({
        imageUrl,summary,skills,workExperience,linkedinUrl,githubUrl,codingPlatform,resumeUrl
    })
    const data=await newProfile.save();

    return res.status(201).json({
        message:"profile created!",
        data
    })
}


export const getProfile=async(req,res)=>{
    const data=await Profile.find({});
    res.status(200).json({
        message:"All Profiles",
        data
    })
}