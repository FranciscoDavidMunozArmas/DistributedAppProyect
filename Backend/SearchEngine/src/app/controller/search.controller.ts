import { Request, Response } from 'express';
import config from '../../config/config';
import { apiAdapter } from '../adapter/apiAdapter';

const baseURL = config.SERVICE_RECIPE;
const api = apiAdapter(baseURL);

export const getRecipeByName = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Get All"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}


export const getRecipeByAuthor = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Get All"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}
