import axios from 'axios';

export const apiAdapter = (baseURL) => {
    return axios.create({
        baseURL
    })
}