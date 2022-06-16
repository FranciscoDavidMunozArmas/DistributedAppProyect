import { Schema, model } from 'mongoose';
import { User } from '../model/user';

const schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true
});

export default model<User>("User", schema);