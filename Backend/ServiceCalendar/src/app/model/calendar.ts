import { Document } from "mongoose";

export interface ICalendar extends Document {
    _id?: string;
    user: string;
    calendar: [{
        _id?: string,
        date: Date,
        recipe: string
    }]
}