import env from './env.config.js';

const appConfig = {
  ...env.app,
  rateLimit: env.rateLimit,
};

export default appConfig;
export { appConfig };
