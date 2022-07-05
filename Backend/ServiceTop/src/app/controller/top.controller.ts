import axios from 'axios';
import { Request, Response } from 'express';
import { SERVICES } from '../../config/services';
import { ResponseStatusCode, ResponseStatusMessages } from '../../config/status';
import { Top } from '../model/top';

export const getTopRecipes = async (req: Request, res: Response) => {
    const max = (req.params.max) ? Number.parseInt(req.params.max) : 10;
    try {
        const retrivedScores = await retriveScore();
        const scores = sliceArray(sortScores(retrivedScores), max);

        const recipes: any[] = [];
        const authors: any[] = [];
        for (const score of scores) {
            recipes.push(await retriveRecipe(score.recipe));
        }
        for (const recipe of recipes) {
            authors.push(await retriveAuthor(recipe.author));
        }

        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "Top retrived",
            data: createTOP(recipes, authors, scores)
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }


}

export const getTopCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    const max = (req.params.max) ? Number.parseInt(req.params.max) : 10;
    try {
        const recipes = sliceArray(await retriveRecipeCategory(category), max);
        const scores: any[] = [];
        const authors: any[] = [];

        for(const recipe of recipes) {
            scores.push(retriveScoreRecipe(recipe._id));
        }

        for (const recipe of recipes) {
            authors.push(await retriveAuthor(recipe.author));
        }

        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "Top retrived",
            data: createTOP(recipes, authors, scores)
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}

const retriveScore = async () => {
    const recipes = await axios.get(`${SERVICES.SCORE}/recipes`);
    const retrivedScores = recipes.data.data;
    return retrivedScores.scores;
}

const retriveScoreRecipe = async (id: string) => {
    const recipes = await axios.get(`${SERVICES.SCORE}/recipes/${id}`);
    const retrivedScores = recipes.data.data;
    return retrivedScores.scores;
}

const retriveRecipe = async (id: string) => {
    const recipe = await axios.get(`${SERVICES.RECIPE}/recipe/${id}`);
    return recipe.data.data;
}

const retriveRecipeCategory = async (category: string) => {
    const recipe = await axios.get(`${SERVICES.RECIPE}/recipe/category/${category}`);
    return recipe.data.data;
}

const retriveAuthor = async (id: string) => {
    const author = await axios.get(`${SERVICES.USER}/${id}`);
    return author.data.data;
}

const sortScores = (scoreArray: any[]) => {
    return scoreArray.sort((a, b) => b.score - a.score);
}

const sliceArray = (arr: any[], max: number) => {
    return arr.slice(0, max);
}

const createTOP = (recipes: any[], authors: any[], scores: any[]) => {
    const dataLength = scores.length;
    const topList: Top[] = [];
    for (let i = 0; i < dataLength; i++) {
        topList.push({
            author: {
                username: authors[i].username,
                email: authors[i].email
            },
            recipe: {
                _id: recipes[i],
                title: recipes[i].title,
                ingredients: recipes[i].ingredients,
                steps: recipes[i].steps,
                image: recipes[i].image,
                category: recipes[i].category,
                time: recipes[i].time,
                plates: recipes[i].plates,
                calories: recipes[i].calories,
                description: recipes[i].description
            },
            score: scores[i].score

        });
    }
    return topList;
}