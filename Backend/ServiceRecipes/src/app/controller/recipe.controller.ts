import { Request, Response } from 'express';
import { ResponseStatusCode, ResponseStatusMessages } from '../../config/status';
import { Recipe } from '../model/recipe';
import recipeShema from '../schemas/recipe.shema';

export const getAll = async (req: Request, res: Response) => {
    try {
        const recipes = (await recipeShema.find({}));
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Recipes retrieved successfully',
            data: recipes
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

export const post = async (req: Request, res: Response) => {
    try {
        const data: Recipe = req.body;
        data.image = (req.file) ? req.file.path : "";
        const recipe = await recipeShema.create(data);
        return res.status(ResponseStatusCode.CREATED).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Recipe created successfully',
            data: recipe
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteAll = async (req: Request, res: Response) => {
    try {
        await recipeShema.deleteMany({});
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Recipes deleted successfully'
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const recipe = await recipeShema.findById(id);
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Recipe retrieved successfully',
            data: recipe
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

export const putID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data: Recipe = req.body;
        const oldRecipe = await recipeShema.findById(id);
        if (!oldRecipe) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: 'Recipe not found'
            });
        }
        data.image = (req.file) ? req.file.path : "";
        const recipe = await recipeShema.findByIdAndUpdate(id, data, { new: true });
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Recipe updated successfully',
            data: recipe
        });

    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const recipe = await recipeShema.findOneAndDelete({ _id: id });
        if (!recipe) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: 'Recipe not found'
            });
        }
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Recipe deleted successfully'
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getAuthorID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await recipeShema.find();
        const recipes = data.filter(recipe => recipe.author.toString() === id);
        if (!recipes) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: 'Recipes not found'
            });
        }
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Recipes retrieved successfully',
            data: recipes
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteAuthorID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const recipes = await recipeShema.deleteMany({ author: id });
        if (!recipes) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: 'Recipes not found'
            });
        }
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Recipe deleted successfully'
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.params;
        const data = await recipeShema.find();
        const recipes = data.filter(recipe => recipe.category.toString() === category.toString());
        if (!recipes) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: 'Recipes not found'
            });
        }
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Recipes retrieved successfully',
            data: recipes
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}