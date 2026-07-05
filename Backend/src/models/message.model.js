import mongoose from "mongoose";

const { Schema, model } = mongoose;

const MessageSchema = new Schema({
	chat: { 
        type: Schema.Types.ObjectId, 
        ref: 'Chat', 
        required: true, 
        index: true 
    },
	role: { 
        type: String, 
        enum: ['user', 'ai', 'system'], 
        required: true, 
        default: 'user' 
    },
	content: { 
        type: String, 
        required: true 
    },
}, { timestamps: true });

const messageModel = mongoose.model('Message', MessageSchema);

export default messageModel;
