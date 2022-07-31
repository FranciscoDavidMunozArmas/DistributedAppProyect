import { Schema, model } from 'mongoose';
import { ICalendar } from '../model/calendar';

const schema = new Schema({
    user: {
        type: String,
        required: true
    },
    calendar: [
        {
            date: {
                type: Date,
                required: true
            },
            recipe: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

export default model<ICalendar>("Calendar", schema);