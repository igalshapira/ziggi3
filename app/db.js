module.exports = function (app) {
  var mongoose = require('mongoose');
  var config = app.get('config');
  var Schema = mongoose.Schema;
  var dbUrl = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || ('mongodb://localhost/ziggi3_' + config.university)

  mongoose.connect(dbUrl, function (err, res) {
      if (err) {
        console.log ('ERROR connecting to: ' + dbUrl + '. ' + err);
      } else {
        console.log ('Succeeded connected to: ' + dbUrl);
    }
  });

  return {
    mongoose: mongoose,
    Course: require('./model/course')(mongoose),
    Search: require('./model/search')(mongoose),
    Semester: require('./model/semester')(mongoose),
    Building: require('./model/building')(mongoose),
    Department: require('./model/department')(mongoose),
    Calendar: require('./model/calendar')(mongoose)
  };
};
