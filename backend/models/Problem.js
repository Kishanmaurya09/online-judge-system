import mongoose, { mongo } from "mongoose";

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
        difficulty:{
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "easy",
        },

        inputFormate:{
            type: String,
        },

        outputFormate:{
            type: String,
        },

        constraints:{
            type: String,
        },

        testCases:[
            {
                input: { type: String },
                output: { type: String}
            }
        ],

        sampleInput:{
            type: String,
        },

        sampleOutput:{
            type: String,
        },

        tags: [String],
    },
    { timestamps: true}
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;