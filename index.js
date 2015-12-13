var express = require('express');
var app = express();
var cookieParser = require("cookie-parser");
var session = require("express-session");
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(expressValidator({
	customValidators: {
		isMinLength: function(param, num) {
			return param.length >= num;
		},
	    isSemester: function(param) {
	    	var val = parseInt(param);
	        return val === 1 || val === 2 || val === 3;
	    },
	    isYear: function(param) {
	    	var val = parseInt(param);
	        return val >= 2015;
	    },
	    gte: function(param, num) {
	        return param >= num;
	    }
 	}
}));


app.use(express.static(__dirname + '/public'));
app.use('/js',  express.static(__dirname + '/build'));
app.use('/css',  express.static(__dirname + '/build'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.set('db', require('./app/db'));
require('./app/routes')(app);

app.listen((process.env.PORT || 5000), function() {
  console.log('Node app is running on port', (process.env.PORT || 5000));
});