import { Request, Response } from 'express';
import { ResponseStatusCode, ResponseStatusMessages } from '../../config/status';
import commentaryShema from '../schemas/commentary.shema';

export const getAll = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const commentaries = await commentaryShema.find({ recipe: id });
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "Commentaries found",
            data: commentaries.sort((a: any, b: any) => b.date - a.date)
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

export const post = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const { user, comment } = req.body;
        const commentary = await commentaryShema.create({
            recipe: id,
            user: user,
            comment: comment,
        });
        return res.status(ResponseStatusCode.CREATED).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "Commentary created",
            data: commentary
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteAll = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        await commentaryShema.deleteMany({ recipe: id });
        return res.status(ResponseStatusCode.NO_CONTENT).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "Commentaries deleted"
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteID = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        await commentaryShema.deleteOne({ _id: id });
        return res.status(ResponseStatusCode.NO_CONTENT).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "Commentary deleted"
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}