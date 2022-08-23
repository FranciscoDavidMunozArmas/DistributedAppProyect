import { apiAdapter } from '../utils/apiAdapter';
const apiURL = apiAdapter('http://localhost:8090/users');

export const postUser = async(user) => {
    return await apiURL.post('', user);
}

export const getUser = async(id) => {
    return await apiURL.get(`${id}`);
}

export const getUserByEmail = async(email) => {
    return await apiURL.get(`/email/${email}`);
}

export const putUserByEmail = async(email, user) => {
    return await apiURL.put(`/email/${email}`, user);
}