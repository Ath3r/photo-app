import dotenv from 'dotenv';
dotenv.config();

const AppConfig = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_SALT: process.env.JWT_SALT,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
}


export { AppConfig };