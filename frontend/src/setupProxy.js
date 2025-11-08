const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3002', // <- yahan backend ka port likh
      changeOrigin: true,
    })
  );
};
