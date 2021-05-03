const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/*",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/Product/*",
    createProxyMiddleware({
      target: "https://dataservices.sypramsoftware.com/api",
      changeOrigin: true,
    })
  );
};
