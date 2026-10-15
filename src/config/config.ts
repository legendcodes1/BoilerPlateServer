import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  appMode: "DEV" | "PROD" | "STAGING"
  mongoUri: string
  port: number
  // tokenSecret: string
  // tokenTtl: string
  // refreshTokenSecret: string
  // refreshTokenTtl: string
}

const config = {
  appMode: process.env.APP_MODE || "DEV",
  mongoUri: process.env[`${process.env.APP_MODE}_MONGO_URI`] || "mongodb://localhost:27017/boilerplate",
  port: Number(process.env.PORT || 8000)
} as IConfig

export default config;


// # PROD | DEV | STAGING
// APP_MODE=DEV

// PORT=5432

// DEV_MONGO_URI=mongodb://localhost:27017/boilerplate
// STAGING_MONGO_URI=mongodb://mongo:27017/boilerplate
// PROD_MONGO_URI=<ATLAS_MONGO_URI>

// TOKEN_SECRET=
// TOKEN_TTL=
// REFRESH_TOKEN_SECRET=
// REFRESH_TOKEN_TTL=
