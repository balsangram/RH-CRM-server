module.exports = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/rh_global_crm',
  options: {
    autoIndex: process.env.NODE_ENV !== 'production',
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  },
};
