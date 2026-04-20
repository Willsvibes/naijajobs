import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    jobType: {
        type: String,
        required: false,
        enum: ["Full-time", "Part-time", "Freelance", "Contract"]
    },

    category: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    duration: {
        type: String,
        required: true,
    },

    skills: [String],


    salary: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true});


export const Job = mongoose.model("Job", jobSchema);
