import { Request, Response } from 'express';
import axios from 'axios';
import { SERVICES } from '../../config/services';
import { Recipe } from '../model/recipe';
import { ResponseStatusCode, ResponseStatusMessages } from '../../config/status';

export const getRecipes = async (req: Request, res: Response) => {
    try {
        const recipes = await axios.get(`${SERVICES.SERVICE_RECIPE}`);
        const recipesData = recipes.data.data;
        const recipesComplete: Recipe[] = [];
        for (const recipe of recipesData) {
            const user = await retriveUser(recipe.author);
            const score = await retriveScore(recipe._id);
            const recipeWithUser = {
                recipe: refactorRecipe(recipe),
                user: user,
                score: score,
            };
            recipesComplete.push(recipeWithUser);
        }
        return res.status(ResponseStatusCode.OK).json({ 
            status: ResponseStatusCode.OK,
            message: "Recipes retrieved successfully",
            data: recipesComplete
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}

export const getID = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const recipe = await axios.get(`${SERVICES.SERVICE_RECIPE}/recipe/${id}`);
        const user = await retriveUser(recipe.data.data.author);
        const score = await retriveScore(recipe.data.data._id);
        const recipeComplete = {
            recipe: refactorRecipe(recipe.data.data),
            user: user,
            score: score,
        };
        return res.status(ResponseStatusCode.OK).json({ 
            status: ResponseStatusCode.OK,
            message: "Recipe retrieved successfully",
            data: recipeComplete
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}

export const getAuthorID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const recipes = await axios.get(`${SERVICES.SERVICE_RECIPE}/recipe/author/${id}`);
        const user = await retriveUser(id);
        const recipesData = recipes.data.data;
        const recipesComplete: any[] = [];
        for (const recipe of recipesData) {
            const score = await retriveScore(recipe._id);
            recipesComplete.push({
                recipe: refactorRecipe(recipe),
                score: score,
            });
        }
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusCode.OK,
            message: "Recipes retrieved successfully",
            data: {
                user: user,
                recipes: recipesComplete
            }
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}

const retriveUser = async (id: string) => {
    const user = await axios.get(`${SERVICES.SERVICE_USER}/${id}`);
    return {
        username: user.data.data.username,
        email: user.data.data.email,
    };
}

const retriveScore = async (id: string) => {
    const score = await axios.get(`${SERVICES.SERVICE_SCORE}/recipes/${id}`);
    return score.data.data.score;
}

const refactorRecipe = (recipe: any) => {
    return {
        _id: recipe._id,
        author: recipe.author,
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        time: recipe.time,
        plates: recipe.plates,
        calories: recipe.calories,
        ingredients: recipe.ingredients,
        steps: recipe.steps
    }
}