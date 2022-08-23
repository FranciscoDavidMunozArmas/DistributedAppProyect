import { apiAdapter } from '../utils/apiAdapter';
const apiURL = apiAdapter('http://localhost:8090/top');

export const topTenRecipes = async() => {
    return await apiURL.get(`recipes`);
}

export const topRecipes = async(max) => {
    return await apiURL.get(`recipes/${max}`);
}