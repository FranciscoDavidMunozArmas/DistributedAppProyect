import { Request, Response } from 'express';
import { SERVICES } from '../../config/services';
import { ResponseStatusCode } from '../../config/status';
import favouriteSchema from '../schema/favourite.schema';
import axios from 'axios';

export const saveFavourite = async (req: Request, res: Response) => {
    try {
        const { user } = req.params;
        const { recipe } = req.body;
        const favouriteData = await favouriteSchema.findOne({ user });
        if (!favouriteData) {
            await createNewFavourite(user, recipe);
        } else {
            if (!favouriteData.recipes.includes(recipe)) {
                await setNewFavourite(user, recipe);
            } else {
                return res.status(ResponseStatusCode.OK).json({
                    status: ResponseStatusCode.OK,
                    message: "Recipe already in favourite"
                });
            }
        }
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusCode.OK,
            message: "Favourite saved"
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getFavourites = async (req: Request, res: Response) => {
    try {
        const { user, recipe } = req.params;
        const favouriteData = await favouriteSchema.findOne({ user });
        if (!favouriteData) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusCode.NOT_FOUND,
                message: "No favourites found"
            });
        }
        const favouriteRecipes = favouriteData.recipes;
        const favouriteRecipesData = await retriveFavourites(favouriteRecipes);
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusCode.OK,
            message: "Favourites retrieved successfully",
            data: favouriteRecipesData
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const removeFavourite = async (req: Request, res: Response) => {
    try {
        const { user, recipe } = req.params;
        await favouriteSchema.findOneAndUpdate({ user }, {
            $pull: {
                recipes: recipe
            }
        }, { new: true });
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusCode.OK,
            message: "Favourite removed"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

const createNewFavourite = async (user: string, recipe: string) => {
    await favouriteSchema.create({
        user,
        recipes: [recipe]
    });
}

const setNewFavourite = async (user: string, recipe: string) => {
    await favouriteSchema.findOneAndUpdate({ user }, {
        $push: {
            recipes: recipe
        }
    }, { new: true });
}

const retriveFavourites = async (recipes: string[]) => {
    const favourites = [];
    for (const recipe of recipes) {
        favourites.push((await axios.get(`${SERVICES.SERVICE_FULL_RECIPE}/recipe/${recipe}`)).data.data);
    }
    return favourites;
}