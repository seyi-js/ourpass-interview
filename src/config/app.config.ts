export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || process.env.PORT || 3000,
    environment: process.env.APP_ENV || 'development',
  },
});
