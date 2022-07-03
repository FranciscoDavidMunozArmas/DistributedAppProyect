import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGO_NAME: process.env.MONGO_NAME,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    PORT: process.env.PORT || 3000
}