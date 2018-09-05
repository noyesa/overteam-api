const express = require('express');
const config = require('./server-config');
const overwatchRouter = require('./overwatch-router');

const app = express();

app.get('/healthcheck', (req, res) => {
  res.send('GOOD');
});

app.use('/overwatch', overwatchRouter);

app.listen(config.port, () => {
  console.log(`overteam-api listening on port ${config.port}`);
});
