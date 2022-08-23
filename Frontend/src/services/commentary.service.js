import { apiAdapter } from '../utils/apiAdapter';
const apiURL = apiAdapter('http://localhost:8090/commentaries');

export const postCommentary = async(commentaries) => {
    return await apiURL.post('', commentaries);
}

export const deleteCommentary = async() => {
    return await apiURL.delete('');
}

export const putCommentary = async(id, commentary) => {
    return await apiURL.put(`${id}`, commentary);
}

export const deleteCommentaryById = async(id) => {
    return await apiURL.delete(`${id}`);
}

export const getCommentariesByRecipe = async(recipe) => {
    return await apiURL.get(`recipe/${recipe}`);
}

export const deleteCommentariesByRecipe = async(recipe) => {
    return await apiURL.delete(`recipe/${recipe}`);
}