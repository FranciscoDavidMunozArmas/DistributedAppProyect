import { Request, Response } from 'express';
import { ResponseStatusCode, ResponseStatusMessages } from '../../config/status';
import commentarySchema from '../schemas/commentary.schema';

export const postCommentary = async (req: Request, res: Response) => {
    try {
        const { user, recipe, comment } = req.body;
        const commentary = await commentarySchema.create({ user, recipe, comment });
        return res.status(ResponseStatusCode.CREATED).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Commentary created',
            data: commentary
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}

export const deleteCommentaries = async (req: Request, res: Response) => {
    try {
        await commentarySchema.deleteMany({});
        return res.status(ResponseStatusCode.NO_CONTENT).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Commentary deleted'
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}

export const putCommentary = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const commentary = await commentarySchema.findById(id);
        if (!commentary) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: 'Commentary not found'
            });
        }
        commentary.comment = comment;
        await commentary.save();
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Commentary updated',
            data: commentary
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}

export const deleteCommentary = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const commentary = await commentarySchema.findById(id);
        if (!commentary) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: 'Commentary not found'
            });
        }
        await commentary.remove();
        return res.status(ResponseStatusCode.NO_CONTENT).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Commentary deleted'
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}

export const getCommentaryByRecipe = async (req: Request, res: Response) => {
    try {
        const { recipe } = req.params;
        const commentary = await commentarySchema.find({ recipe: recipe });
        if (!commentary) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: 'Commentary not found'
            });
        }
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Commentary found',
            data: commentary
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}

export const deleteCommentaryByRecipe = async (req: Request, res: Response) => {
    try {
        const { recipe } = req.params;
        const commentary = await commentarySchema.find({ recipe: recipe });
        if (!commentary) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: 'Commentary not found'
            });
        }
        await commentarySchema.deleteMany({ recipe: recipe });
        return res.status(ResponseStatusCode.NO_CONTENT).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Commentary deleted'
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}

export const getComentaryByUser = async (req: Request, res: Response) => {
    try {
        const { user } = req.params;
        const commentary = await commentarySchema.find({ user });
        if (!commentary) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: 'Commentary not found'
            });
        }
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Commentary found',
            data: commentary
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}

export const deleteCommentaryByUser = async (req: Request, res: Response) => {
    try {
        const { user } = req.params;
        const commentary = await commentarySchema.find({ user });
        if (!commentary) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: 'Commentary not found'
            });
        }
        await commentarySchema.deleteMany({ user });
        return res.status(ResponseStatusCode.NO_CONTENT).json({
            status: ResponseStatusMessages.SUCCESS,
            message: 'Commentary deleted'
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}