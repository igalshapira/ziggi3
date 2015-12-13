var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dbUrl = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/ziggi3_bgu'

mongoose.connect(dbUrl, function (err, res) {
  	if (err) {
  		console.log ('ERROR connecting to: ' + dbUrl + '. ' + err);
  	} else {
  		console.log ('Succeeded connected to: ' + dbUrl);
	}
});

module.exports = {
    mongoose: mongoose,
    Course: require('./model/course')(mongoose),
    Building: require('./model/building')(mongoose),
    Department: require('./model/department')(mongoose)
};
