import { Request, Response } from 'express';
import config from '../../config/config';
import { ResponseStatusCode, ResponseStatusMessages } from '../../config/status';
import { apiAdapter } from '../adapter/apiAdapter';

const baseURL = config.SERVICE_RECIPE;
const api = apiAdapter(baseURL);

export const getRecipeByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const data = await retriveRecipes();
        const result = retriveRecipeByName(name, data);
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "Recipes found",
            data: result
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}


export const getRecipeByAuthor = async (req: Request, res: Response) => {
    try {
        const { author } = req.params;
        const data = await retriveRecipes();
        const result = retriveRecipeByAuthor(author, data);
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "Recipes found",
            data: result
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}


const retriveRecipes = async () => {
    const data = await api.get('/');
    return data.data.data;
}

const retriveRecipeByName = (name: string, recipes: any[]) => {
    const regex = new RegExp(`${name}+`, 'i');
    const result = recipes.filter(recipe => regex.test(recipe.recipe.title));
    return result;
}

const retriveRecipeByAuthor = (author: string, recipes: any[]) => {
    const regex = new RegExp(`${author}+`, 'i');
    const result = recipes.filter(recipe => {
        console.log(recipe);
        return regex.test(recipe.user.username)
    });
    return result;
}