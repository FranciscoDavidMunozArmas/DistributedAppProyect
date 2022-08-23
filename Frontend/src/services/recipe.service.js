import { apiAdapter } from '../utils/apiAdapter';
const apiURL = apiAdapter('http://localhost:8090/recipes');

export const getRecipes = async() => {
    return await apiURL.get(``);
}

export const postRecipe = async(recipe) => {
    return await apiURL.post(``, recipe);
}

export const deleteRecipes = async() => {
    return await apiURL.delete(``);
}

export const getRecipeByID = async(recipe) => {
    return await apiURL.get(`recipe/${recipe}`);
}

export const putRecipeByID = async(id, recipe) => {
    return await apiURL.put(`recipe/${id}`, recipe);
}

export const deleteRecipeByID = async(id) => {
    return await apiURL.delete(`recipe/${id}`);
}

export const getRecipeByAuthor = async(author) => {
    return await apiURL.get(`recipe/author/${author}`);
}

export const deleteRecipeByAuthor = async(author) => {
    return await apiURL.delete(`recipe/author/${author}`);
}

export const getRecipeByCategory = async(category) => {
    return await apiURL.get(`recipe/category/${category}`);
}

export const deleteRecipeByCategory = async(category) => {
    return await apiURL.delete(`recipe/category/${category}`);
}