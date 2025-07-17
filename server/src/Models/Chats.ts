import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: { 
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        timestamp: { type: Date, default: Date.now },
     },
    unreadCount: { type: Number, default: 0 },
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
