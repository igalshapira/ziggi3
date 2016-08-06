'use strict'
var db = require('../app/db');

exports.up = function(next) {
  db.Semester.create([
  	{
  		name: 'סתיז תשע"ז', year: 2017, semester: 1,
  		startDate: new Date("2016-10-29T00:00:00.000Z"),
  		endDate: new Date("2017-01-26T00:00:00.000Z"),
  		examsStart: new Date("2017-01-28T00:00:00.000Z"),
  		examsEnd: new Date("2017-03-09T00:00:00.000Z")
  	},
	{
	    name: 'אביב תשע"ז',  year: 2017, semester: 2,
	    startDate: new Date("2017-03-11T00:00:00.000Z"),
  		endDate: new Date("2017-06-29T00:00:00.000Z"),
  		examsStart: new Date("2017-07-01T00:00:00.000Z"),
	}
  	], function(err) {
	    if (err)
	      throw err;
	    next();
	  });
};

exports.down = function(next) {
  next();
};
