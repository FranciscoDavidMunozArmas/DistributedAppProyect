import { apiAdapter } from '../utils/apiAdapter';
const apiURL = apiAdapter('http://localhost:8090/calendar');

export const getCalendar = async(user) => {
    return await apiURL.get(`${user}`);
}

export const postCalendar = async(user, calendar) => {
    return await apiURL.post(`${user}`, calendar);
}

export const deleteCalendar = async(user) => {
    return await apiURL.delete(`${user}`);
}

export const updateCalendarByCalendarID = async(user, id, calendar) => {
    return await apiURL.put(`${user}/${id}`, calendar);
}

export const deleteCalendarByCalendarID = async(user, id) => {
    return await apiURL.post(`${user}/${id}`);
}