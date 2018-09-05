const LRU = require('lru-cache');
const { getProfile } = require('../util/denodeified-overwatch-api');
const config = require('../server-config');

const moduleName = 'stores/profile-store';

class ProfileStore {
  constructor() {
    this._cache = new LRU({
      max: config.profileLRUMaxSize || 500,
      maxAge: 60 * 60 * 1000
    });
  }

  get(platform, region, battletag) {
    const key = this._getKey(platform, region, battletag);
    if (this._cache.has(key)) {
      console.log(`${moduleName} - Cache hit - ${key}`);
      return this._cache.get(key);
    } else {
      const profile = getProfile(platform, region, battletag).then(profile => {
        profile.id = battletag;
        return profile;
      });
      console.log(`${moduleName} - Cache miss - ${key}`);
      this._cache.set(key, profile);
      return profile;
    }
  }

  _getKey(platform, region, battletag) {
    return [platform, region, battletag]
      .map(item => encodeURIComponent(item))
      .join(',');
  }
}

module.exports = ProfileStore;
