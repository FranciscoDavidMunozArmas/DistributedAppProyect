import axios from 'axios';
import { Request, Response } from 'express';
import { SERVICES } from '../../config/services';
import { ResponseStatusCode } from '../../config/status';
import calendarShema from '../schemas/calendar.shema';

export const getFullCalendar = async (req: Request, res: Response) => {
    try {
        const { user } = req.params;
        const calendar = await calendarShema.findOne({ user });
        if (!calendar) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusCode.NOT_FOUND,
                message: 'Calendar not found'
            });
        } else {
            const data = [];
            for (const day of calendar.calendar) {
                data.push({
                    date: day.date,
                    recipe: await retriveRecipe(day.recipe)
                });
            }
            return res.status(ResponseStatusCode.OK).json({
                status: ResponseStatusCode.OK,
                message: 'Calendar found',
                data: data
            });
        }
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            status: ResponseStatusCode.INTERNAL_SERVER_ERROR,
            message: "Error",
            error: error.message
        });
    }
}

export const saveDate = async (req: Request, res: Response) => {
    try {
        const { user } = req.params;
        const { date, recipe } = req.body;
        const calendar = await calendarShema.findOne({ user });
        if (!calendar) {
            const calendarEntry = await createCalendarEntry(user, { date, recipe });
            return res.status(ResponseStatusCode.OK).json({
                status: ResponseStatusCode.OK,
                message: 'Calendar created',
                data: calendarEntry
            });
        } else {
            const calendarEntry = await setNewCalendar(user, { date, recipe });
            return res.status(ResponseStatusCode.OK).json({
                status: ResponseStatusCode.OK,
                message: 'Calendar updated',
                data: calendarEntry
            });
        }
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            status: ResponseStatusCode.INTERNAL_SERVER_ERROR,
            message: "Error",
            error: error.message
        });
    }
}

export const removeFullCalendar = async (req: Request, res: Response) => {
    try {
        const { user } = req.params;
        const calendar = await calendarShema.findOneAndDelete({ user });
        if (!calendar) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusCode.NOT_FOUND,
                message: 'Calendar not found'
            });
        } else {
            return res.status(ResponseStatusCode.OK).json({
                status: ResponseStatusCode.OK,
                message: 'Calendar deleted'
            });
        }
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            status: ResponseStatusCode.INTERNAL_SERVER_ERROR,
            message: "Error",
            error: error.message
        });
    }
}

export const updateCalendar = async (req: Request, res: Response) => {
    try {
        const { user, calendar } = req.params;
        const { date, recipe } = req.body;
        const calendarEntry = await calendarShema.findOne({ user });
        if (!calendarEntry) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusCode.NOT_FOUND,
                message: 'Calendar not found'
            });
        }
        const newCalendar = calendarEntry.calendar.map(day => {
            if (`${day._id}` === `${calendar}`) {
                day.recipe = recipe;
                day.date = date;
            }
            return day;
        }
        );
        const updatedCalendar = await calendarShema.findOneAndUpdate({ user }, {
            $set: {
                calendar: newCalendar
            }
        }, { new: true });
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusCode.OK,
            message: 'Calendar updated',
            data: updatedCalendar
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            status: ResponseStatusCode.INTERNAL_SERVER_ERROR,
            message: "Error",
            error: error.message
        });
    }
}

export const deleteCalendar = async (req: Request, res: Response) => {
    try {
        const { user, calendar } = req.params;
        const calendarEntry = await calendarShema.findOne({ user });
        if (!calendarEntry) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusCode.NOT_FOUND,
                message: 'Calendar not found'
            });
        }
        const newCalendar = calendarEntry.calendar.filter(day => {
            if (`${day._id}` !== `${calendar}`) {
                return day;
            }
        }
        );
        const updatedCalendar = await calendarShema.findOneAndUpdate({ user }, {
            $set: {
                calendar: newCalendar
            }
        }, { new: true });
        return res.status(ResponseStatusCode.OK).json({
            status: ResponseStatusCode.OK,
            message: 'Calendar removed',
        });
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getCalendarByDay = async (req: Request, res: Response) => {
    try {
        const { user } = req.params;
        const { day } = req.body;
        const calendar = await calendarShema.findOne({ user });
        if (!calendar) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusCode.NOT_FOUND,
                message: 'Calendar not found'
            });
        } else {
            const filterCalendar = calendar.calendar.filter(date => {
                if (`${date.date}` === `${day}`) {
                    return date;
                }
            });
            const data = [];
            for (const child of filterCalendar) {
                data.push({
                    date: child.date,
                    recipe: await retriveRecipe(child.recipe)
                });
            }
            return res.status(ResponseStatusCode.OK).json({
                status: ResponseStatusCode.OK,
                message: 'Calendar found',
                data: data
            });
        }
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getCalendarByDate = async (req: Request, res: Response) => {
    try {
        const { user } = req.params;
        const { startdate, enddate } = req.body;
        const calendar = await calendarShema.findOne({ user });
        if (!calendar) {
            return res.status(ResponseStatusCode.NOT_FOUND).json({
                status: ResponseStatusCode.NOT_FOUND,
                message: 'Calendar not found'
            });
        } else {
            const filterCalendar = calendar.calendar.filter(day => {
                if ((new Date(`${day.date}`)).getTime() >= (new Date(`${startdate}`)).getTime() &&
                    (new Date(`${day.date}`)).getTime() <= (new Date(`${enddate}`)).getTime()) {
                    return day;
                }
            });
            const data = [];
            for (const child of filterCalendar) {
                data.push({
                    date: child.date,
                    recipe: await retriveRecipe(child.recipe)
                });
            }
            return res.status(ResponseStatusCode.OK).json({
                status: ResponseStatusCode.OK,
                message: 'Calendar found',
                data: data
            });
        }
    } catch (error: any) {
        return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            error: error.message
        });
    }
}

const createCalendarEntry = async (user: string, calendar: { date: Date, recipe: string }) => {
    const calendarEntry = await calendarShema.create({
        user: user,
        calendar: [{
            date: calendar.date,
            recipe: calendar.recipe
        }]
    });
    return calendarEntry;
}

const setNewCalendar = async (user: string, calendar: { date: Date, recipe: string }) => {
    const calendarEntry = await calendarShema.findOneAndUpdate({ user }, {
        $push: {
            calendar: {
                date: calendar.date,
                recipe: calendar.recipe
            }
        }
    }, { new: true });
    return calendarEntry;
}

const retriveRecipe = async (recipe: string) => {
    return (await axios.get(`${SERVICES.SERVICE_FULL_RECIPE}/recipe/${recipe}`)).data.data;
}