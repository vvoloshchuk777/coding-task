import * as dotenv from 'dotenv';
import env = require('env-var');

dotenv.config();

export const APP_HOST: string = env.get('APP_HOST').required(false).default('localhost').asString();
export const PORT: number = env.get('PORT').required(false).default('3000').asPortNumber();
export const IS_DEBUG: boolean = env.get('IS_DEBUG').required(false).default('true').asBool();

export const DB_CONFIG = {
  // eslint-disable-next-line
  type: 'mongodb' as 'mongodb',
  host: env.get('MONGO_HOST').required(false).default('localhost').asString(),
  port: env.get('MONGO_PORT').required(false).default(27017).asPortNumber(),
  database: env.get('DB_SCHEMA').required(false).default('coding').asString(),
  synchronize: true,
  entities: ['./src/entities/*'],
  migrations: ['./migrations/*'],
  logging: IS_DEBUG,
};

export const TEST_DB_CONFIG = {
  // eslint-disable-next-line
  type: 'mongodb' as 'mongodb',
  host: env.get('TEST_DB_HOST').required(false).default('localhost').asString(),
  port: env.get('TEST_DB_PORT').required(false).default(27017).asPortNumber(),
  database: env.get('TEST_DB_SCHEMA').required(false).default('test').asString(),
  entities: ['./src/entities/*'],
  migrations: ['./migrations/*'],
  logging: false,
};
