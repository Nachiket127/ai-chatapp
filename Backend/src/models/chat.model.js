import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ChatSchema = new Schema({
	user: { type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
	title: { 
        type: String, 
        default: 'New Chat',
        trim: true
     },
}, { timestamps: true });



const chatModel = mongoose.model('Chat', ChatSchema);

export default chatModel;