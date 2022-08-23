import { apiAdapter } from '../utils/apiAdapter';
const apiURL = apiAdapter('http://localhost:8090/favorites');

export const getFavourites = async(user) => {
    return await apiURL.get(`/${user}`);
}

export const postFavourite = async(user, recipe) => {
    return await apiURL.post(`/${user}`, recipe);
}

export const deleteFavourite = async(user, recipe) => {
    return await apiURL.delete(`/${user}/${recipe}`);
}