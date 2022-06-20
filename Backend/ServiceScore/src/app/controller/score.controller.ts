import { Request, Response } from 'express';
import { ResponseStatusCode, ResponseStatusMessages } from '../../config/status';
import scoreSchema from '../schemas/score.schema';

export const getScore = async (req: Request, res: Response) => {
    try {
        const { recipe } = req.params;
        const score = await scoreSchema.findOne({ recipe });
        if (!score) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusCode.NOT_FOUND,
                message: "Score not found",
                data: {
                    score: 0
                }
            });
        }
        const scores = score.scores.map(score => {
            return score.score;
        });
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusCode.OK,
            message: "Score found",
            data: {
                score: scores.reduce((prev, curr) => prev + curr) / scores.length
            }
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}

export const postScore = async (req: Request, res: Response) => {
    try {
        const { recipe, user, score } = req.body;
        const scoreExist = await scoreSchema.findOne({ recipe });
        if (scoreExist) {
            if (scoreExist.scores.find(score => score.user === user)) {
                await updateScore(user, recipe, score);
            } else {
                await setNewScore(user, recipe, score);
            }
            return res.status(ResponseStatusCode.OK).json({
                status: ResponseStatusCode.OK,
                message: "Score updated",
            });
        }
        await createScore(user, recipe, score);
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusCode.OK,
            message: "Score created",
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}

export const deleteScore = async (req: Request, res: Response) => {
    try {
        const { recipe } = req.body;
        const score = await scoreSchema.findOne({ recipe });
        if (!score) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusCode.NOT_FOUND,
                message: "Score not found",
            });
        }
        await scoreSchema.findOneAndDelete({ recipe });
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusCode.OK,
            message: "Score deleted",
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: ResponseStatusMessages.ERROR,
            error: error.message
        });
    }
}

const createScore = async (user: string, recipe: string, score: number) => {
    await scoreSchema.create({
        recipe,
        scores: [
            {
                user,
                score
            }
        ]
    });
}

const setNewScore = async (user: string, recipe: string, score: number) => {
    await scoreSchema.findOneAndUpdate({ recipe }, {
        $push: {
            scores: {
                user,
                score
            }
        }
    }, { new: true });
}

const updateScore = async (user: string, recipe: string, score: number) => {
    await scoreSchema.findOneAndUpdate({ recipe, "scores.user": user }, {
        $set: {
            "scores.$.score": score
        }
    }, { new: true });
}