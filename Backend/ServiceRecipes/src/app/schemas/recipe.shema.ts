import { Schema, model } from 'mongoose';
import { Recipe } from '../model/recipe';

const schema = new Schema({
    title: String,
    image: String,
    category: String,
    time: Number,
    plates: Number,
    ingredients: [String],
    steps: [String],    
    author: String,
    calories: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

export default model<Recipe>("Recipe", schema);