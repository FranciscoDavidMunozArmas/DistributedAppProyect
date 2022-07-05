import dotenv from 'dotenv';

dotenv.config();

export default {
    SERVICE_RECIPE: process.env.SERVICE_RECIPE || "",
    PORT: process.env.PORT || 3000
}