const { denodeify } = require('rsvp');
const overwatchApi = require('overwatch-api');

exports.getProfile = denodeify(overwatchApi.getProfile);
