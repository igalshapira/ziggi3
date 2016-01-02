(function () {
  'use strict';
  var hebShortDays = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']
  var hebLongMonths = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמסר', 'אוקטובר', 'נובמבר', 'דצמבר'];

  angular.module('Ziggi',['ngMaterial', 'ngMessages'])
    .filter('hebShortDay', function() {
      return function(day) {
        return hebShortDays[day-1] + "'";
      };
    })
    .filter('hebTimeRange', function() {
      function hour(h) {
        if (parseInt(h) == h)
          return h + ":00"
        return parseInt(h) + ":" + (h - parseInt(h))*30;
      }
      return function(start, end) {
        return hour(start) + " - " + hour(end);
      }
    })
    .filter('hebFullDate', function() {
      return function(date) {
        var d = new Date(date);

        return "יום " + hebShortDays[d.getUTCDay()] + "' " +
          d.getUTCDate() + " ב" + hebLongMonths[d.getUTCMonth()] + " " + d.getUTCFullYear();
      };
    })
    .filter('hebFullDateTime', function() {
      function twoDigits(val) {
          return ("0" + val).slice(-2);
      }
      return function(date) {
        var d = new Date(date);

        return "יום " + hebShortDays[d.getUTCDay()] + "' " +
          d.getUTCDate() + " ב" + hebLongMonths[d.getUTCMonth()] + " " + d.getUTCFullYear() + " " +
          d.getUTCHours() + ":" + twoDigits(d.getUTCMinutes());
      };
    })
    .service('coursesService', function($http){
        var courses = {};

        var addCourse = function(course) {
            courses[course.number] = course;

            $http.post("/api/v3/course", { year: 2016, semester: 1, number: course.number })
              .success(function(results) {
                courses[course.number] = results.course;
            });
        };

        var getCourses = function(){
            return courses;
        };

        return {
          addCourse: addCourse,
          getCourses: getCourses
        };
    })
    .controller('SearchControl', function ($http, $timeout, $q, $log, coursesService) {
      var self = this;

      self.querySearch = function(query) {
        if (!query)
          return [];

        return $http.post("/api/v3/courses", { year: 2016, semester: 1, string: query })
          .then(function(results) {
            return results.data.courses;
          });
      };

      self.selectedItemChange = function(item) {
        if (!item)
          return;
        coursesService.addCourse(item);
      };
    })
    .controller('CoursesControl', function ($scope, coursesService) {
      var self = this;

      self.courses = coursesService.getCourses();
    });
})();