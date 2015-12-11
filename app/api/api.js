module.exports = function(app) {
  require('./courses')(app);
  require('./rooms')(app);
};