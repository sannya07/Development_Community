import mongoose from "mongoose";

const profileSchema=new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    workExperience:{
        type:String,
        required:true
    },
    linkedinUrl:{
        type:String,
        required:true
    },
    githubUrl:{
        type:String,
        required:true
    },
    codingPlatform:{
        type: [String],
        required:true
    },
    resumeUrl:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model('Profile',profileSchema);