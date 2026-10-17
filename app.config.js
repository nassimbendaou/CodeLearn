const app = require('./app.json');

if (process.env.EXPO_PUBLIC_DEPLOY_TARGET === 'vercel') {
  app.expo.experiments.baseUrl = '';
}

module.exports = app;
