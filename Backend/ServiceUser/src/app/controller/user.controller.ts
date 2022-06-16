import { Request, Response } from 'express';
import { ResponseStatusMessages, ResponseStatusCode } from '../../config/status';
import { User } from '../model/user';
import userShema from '../schemas/user.shema';

export const post = async (req: Request, res: Response) => {
    try {
        await userShema.create(req.body);
        return res.status(ResponseStatusCode.CREATED).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "User has been created",
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const put = (req: Request, res: Response) => {
    try {
        const { email, username } = req.params;
        const data:User = req.body;
        let user;
        if (email) {
            user = userShema.findOneAndUpdate({ email }, data);
        }
        if (username) {
            user = userShema.findOneAndUpdate({ username }, data);
        }
        if (!user) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: "User not found"
            });
        }
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "User updated",
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userShema.findOne({ _id:id });
        if (!user) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: "User not found"
            });
        }
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "User found",
            data: user
        });
            
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const user = await userShema.findOne({ email });
        if (!user) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: "User not found"
            });
        }
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "User found",
            data: user
        });
            
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const user = await userShema.findOneAndDelete({ email });
        if (!user) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: "User not found"
            });
        }
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "User deleted",
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const user = await userShema.findOne({ username });
        if (!user) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: "User not found"
            });
        }
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "User found",
            data: user
        });
            
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const user = await userShema.findOneAndDelete({ username });
        if (!user) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusMessages.ERROR,
                message: "User not found"
            });
        }
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusMessages.SUCCESS,
            message: "User deleted",
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}
