const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  env: {
    DEVDB_URI: 'mongodb://localhost:27017',
    DEVDB_DB: 'cityAr',
    // Replace with secure private key before production use
    JWT_SECRET: 'seemslegit'
  },
});
