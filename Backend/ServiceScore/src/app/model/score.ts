import { Document } from "mongoose";

export interface Score extends Document {
    _id?: string;
    recipe: string;
    scores: [
        {
            user: string;
            score: number;
        }
    ]
}