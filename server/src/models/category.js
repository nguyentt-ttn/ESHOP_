import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    }
}, {versionKey: false, timestamps: true }); 

export default mongoose.model('Category', categorySchema);
