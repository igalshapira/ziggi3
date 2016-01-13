'use strict'
var db = require('../app/db');

exports.up = function(next) {
  db.Semester.create([
  	{
  		name: 'סתיו תשע"ו', year: 2016, semester: 1,
  		startDate: new Date("2015-10-25T00:00:00.000Z"),
  		endDate: new Date("2016-01-22T00:00:00.000Z"),
  		examsStart: new Date("2016-01-24T00:00:00.000Z"),
  		examsEnd: new Date("2016-03-04T00:00:00.000Z")
  	},
	{
	    name: 'אביב תשע"ו',  year: 2016, semester: 2,
	    startDate: new Date("2016-03-06T00:00:00.000Z"),
  		endDate: new Date("2016-07-01T00:00:00.000Z"),
  		examsStart: new Date("2016-07-03T00:00:00.000Z"),
  		examsEnd: new Date("2016-08-12T00:00:00.000Z")
	},
	{
		name: 'קיץ תשע"ו',  year: 2016, semester: 3,
	    startDate: new Date("2016-08-07T00:00:00.000Z"),
  		endDate: new Date("2016-09-23T00:00:00.000Z"),
  		examsStart: new Date("2016-09-25T00:00:00.000Z"),
  		examsEnd: new Date("2016-10-28T00:00:00.000Z")
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
