const express = require('express');
const { all } = require('rsvp');
const ProfileStore = require('./stores/profile-store');
const config = require('./server-config');

const overwatchRouter = express.Router();
module.exports = overwatchRouter;

overwatchRouter.get('/', (req, res) => {
  res.send('Welcome to Overwatch!');
});

const profileStore = new ProfileStore();
overwatchRouter.get('/profiles/:battletag', ({ params }, res) => {
  profileStore
    .get(
      params.platform || config.defaultPlatform || 'pc',
      params.region || config.defaultRegion || 'us',
      params.battletag
    )
    .then(profile => res.json({ profile }))
    .catch(err => {
      res.sendStatus(500);
    });
});
