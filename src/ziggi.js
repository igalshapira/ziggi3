(function () {
  'use strict';

  angular.module('Ziggi',['ngMaterial', 'ngMessages'])
    .filter('hebShortDay', function() {
      return function(input) {
        var days = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']
        return days[input] + "'";
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