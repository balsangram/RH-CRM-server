import env from './env.config.js';

const dbConfig = {
  uri: env.database.uri,
  debug: env.database.debug,
  options: {
    autoIndex: !env.isProduction,
    serverSelectionTimeoutMS: 5000,
  },
};

export default dbConfig;
export { dbConfig };
