import {config} from 'dotenv';

config( {path: `.env.${process.env.NODE_ENV || 'development'}.local`} )

export const { PORT, NODE_ENV, DB_URI } = process.env;

if (!PORT) {
    throw new Error('PORT is not defined in the environment variables');
  }