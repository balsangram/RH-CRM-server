import env from './env.config.js';

const mailerConfig = {
  ...env.email.smtp,
  from: env.email.from,
  provider: env.email.provider,
};

export default mailerConfig;
export { mailerConfig };
