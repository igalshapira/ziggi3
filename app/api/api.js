module.exports = function(app) {
  require('./courses')(app);
  require('./semesters')(app);
  require('./faculties')(app);
  require('./rooms')(app);
  require('./calendar')(app);
};