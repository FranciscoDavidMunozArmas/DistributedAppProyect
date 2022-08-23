import { apiAdapter } from '../utils/apiAdapter';
const apiURL = apiAdapter('http://localhost:8090/search');

export const searchByRecipeName = async(name) => {
    return await apiURL.get(`recipe/name/${name}`);
}

export const searchByRecipeAuthor = async(author) => {
    return await apiURL.get(`recipe/author/${author}`);
}