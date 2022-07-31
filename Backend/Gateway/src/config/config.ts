import dotenv from 'dotenv';

dotenv.config();

export default {
    PREFIX: process.env.PREFIX || '',
    VERSION: process.env.VERSION || '',
    SERVICE_USER: process.env.SERVICE_USER || '',
    SERVICE_RECIPE: process.env.SERVICE_RECIPE || '',
    SERVICE_COMMENTARY: process.env.SERVICE_COMMENTARY || '',
    SERVICE_SCORE: process.env.SERVICE_SCORE || '',
    SERVICE_TOP: process.env.SERVICE_TOP || '',
    SERVICE_FULL_RECIPE: process.env.SERVICE_FULL_RECIPE || '',
    SERVICE_SEARCH_ENGINE: process.env.SERVICE_SEARCH_ENGINE || '',
    SERVICE_FAVOURITES: process.env.SERVICE_FAVOURITES || '',
    SERVICE_CALENDAR: process.env.SERVICE_CALENDAR || '',
    PORT: process.env.PORT || 3000
}