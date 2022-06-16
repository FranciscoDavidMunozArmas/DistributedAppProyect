import { Document } from "mongoose";

export interface Recipe extends Document {
    _id?: string;
    title: string;
    image: string;
    category: string;
    time: number;
    plates: number;
    ingredients: string[];
    steps: string[];
    author: any;
    date: string;
    calories?: number;
    description?: string;
}