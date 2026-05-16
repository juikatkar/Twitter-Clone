import mongoose, { Schema, models } from "mongoose";

const TweetSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const Tweet =
    models.Tweet || mongoose.model("Tweet", TweetSchema)
    
export default Tweet