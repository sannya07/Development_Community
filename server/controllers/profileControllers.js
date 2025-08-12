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

export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;

        // Finding the profile
        const profile = await Profile.findById(id);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        Object.assign(profile, req.body);
        const updatedProfile = await profile.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            data: updatedProfile
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error updating profile",
            error: error.message
        });
    }
};
