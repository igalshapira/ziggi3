var mongoose = require('mongoose');
  var config = require('./config');
  var Schema = mongoose.Schema;
  var dbUrl = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || ('mongodb://localhost/ziggi3_' + config.university)

    mongoose.createConnection(dbUrl, function (err, res) {
      if (err) {
        console.log ('ERROR connecting to: ' + dbUrl + '. ' + err);
      } else {
        console.log ('Succeeded connected to: ' + dbUrl);
    }
  });
  module.exports= {
    mongoose: mongoose,
    Course: require('./model/course')(mongoose),
    Search: require('./model/search')(mongoose),
    Semester: require('./model/semester')(mongoose),
    Building: require('./model/building')(mongoose),
   Department: require('./model/department')(mongoose),
    Calendar: require('./model/calendar')(mongoose)
  };

