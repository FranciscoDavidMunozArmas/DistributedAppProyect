import { Schema, model } from 'mongoose';
import { Commentary } from '../model/commentary';

const schema = new Schema({
    user: {
        type: String,
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default model<Commentary>("Commentary", schema);