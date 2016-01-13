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
    .factory('semestersService', function($http) {
      function getSemesters() {
          return $http.get("/api/v3/semesters");
      }
      
      return {
        getSemesters: getSemesters,
        semester: null
      };
    })
    .factory('coursesService', function($http){
        var courses = {};

        var addCourse = function(year, semester, course) {
            courses[course.number] = course;

            $http.post("/api/v3/course", { year: year, semester: semester, number: course.number })
              .success(function(results) {
                courses[course.number] = results.course;
            });
        };

        return {
          addCourse: addCourse,
          getCourses: function(){ return courses; }
        };
    })
    .controller('SemesterControl', function($scope, semestersService) {
      var self = this;
      self.selectedIndex = 0;
      self.semesters = [];

      $scope.$watch('selectedIndex', function(current, previous) {
        if (typeof current !== 'undefined' && self.semesters[current])
          semestersService.semester = self.semesters[current];
      });

      semestersService.getSemesters().success(function(results) {
        self.semesters = results.semesters;
        self.selectedIndex = 0;
        semestersService.semester = self.semesters[self.selectedIndex];
      });
    })
    .controller('SearchControl', function($scope, $http, $timeout, $q, $log, coursesService, semestersService) {
      var self = this;

      self.semesters = semestersService;

      self.querySearch = function(query) {
        if (!query)
          return [];

        return $http.post("/api/v3/courses", {
            year: self.semesters.semester.year,
            semester: self.semesters.semester.semester,
            string: query
          })
          .then(function(results) {
            return results.data.courses;
          });
      };

      self.selectedItemChange = function(item) {
        if (!item)
          return;
        coursesService.addCourse(self.semesters.semester.year, self.semesters.semester.semester, item);
      };
    })
    .controller('CoursesControl', function ($scope, coursesService) {
      var self = this;

      self.courses = coursesService.getCourses();
    });
})();