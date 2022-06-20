import { Document } from "mongoose";

export interface Commentary extends Document {
    _id?: string;
    user: string;
    recipe: string;
    comment: string;
    date: Date;
}