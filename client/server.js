const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(express.static('public')); // serves your static files

app.use('/api/chat', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));

app.listen(3000);
