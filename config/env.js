module.exports = {
  port: process.env.PORT || 4000,
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/test-venue-scanner'

};
