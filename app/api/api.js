module.exports = function(app) {
  require('./courses')(app);
  require('./faculties')(app);
  require('./rooms')(app);
};