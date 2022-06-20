import { Schema, model } from 'mongoose';
import { Score } from '../model/score';

const schema = new Schema({
    recipe: {
        type: String,
        required: true
    },
    scores: [
        {
            user: {
                type: String,
                required: true
            },
            score: {
                type: Number,
                required: true
            }
        }
    ]
});

export default model<Score>("Score", schema);