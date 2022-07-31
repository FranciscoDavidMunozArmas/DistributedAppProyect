import { Document } from "mongoose";

export interface Favourite extends Document {
    _id: string;
    user: string;
    recipes: string[];
}