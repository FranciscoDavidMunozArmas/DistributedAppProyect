import { apiAdapter } from '../utils/apiAdapter';
const apiURL = apiAdapter('http://localhost:8090/scores');

export const getScores = async() => {
    return await apiURL.get('');
}

export const getScoreByRecipe = async(recipe) => {
    return await apiURL.get(`recipes/${recipe}`);
}

export const updateScoreByRecipe = async(id, recipe) => {
    return await apiURL.put(`recipes/${id}`, recipe);
}

export const deleteScoreByRecipe = async(id, recipe) => {
    return await apiURL.delete(`recipes/${id}`);
}