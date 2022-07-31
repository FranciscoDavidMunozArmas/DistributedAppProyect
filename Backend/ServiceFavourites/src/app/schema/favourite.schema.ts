import { Schema, model } from 'mongoose';
import { Favourite } from '../model/favourite';

const schema = new Schema({
    user: {
        type: String,
        required: true
    },
    recipes: [{
        type: String,
    }]
}, {
    timestamps: true
});

export default model<Favourite>("Favourite", schema);