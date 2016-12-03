(function () {
  'use strict';
  var hebShortDays = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']
  var hebLongMonths = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

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

  angular.module('ZiggiMap',['ngMap'])
    .controller('ZiggiMapController', function($http, NgMap) {
      var self = this;

      self.baseColor = 'ff776b';
      self.courseColor = '4ae14a'
      self.currentColor = '6b6b79';

      self.zoom = 17;
      self.lat = 31.262425; //Hardcoded bgu
      self.lng = 34.801919;
      self.buildings = [ ];

      NgMap.getMap().then(function(map) {
      });

      $http.get('/api/v3/buildings').success(function(data) {
        self.buildings = data.buildings;
      });
    });

  angular.module('ZiggiCalendar', [])
    .controller('ZiggiCalendarController', function($http) {
      var self = this;
      var today = new Date();
      var currMonth = today.getUTCMonth();
      var currYear = today.getUTCFullYear();
      var currDay = today.getDate();
      var firstDay = new Date(currYear, currMonth, 1);
      var daysInMonth = new Date(currYear, currMonth+1, 0).getDate();

      self.calendar = {};
      self.calendar[currYear] = { 
        year: currYear,
        months: {}
      };
      self.calendar[currYear].months[currMonth+1] = {
        name: hebLongMonths[currMonth],
        days: []
      };
      
      var month = self.calendar[currYear].months[currMonth+1];
      // Temporary workaround - pad with days of previous month
      var spacing = firstDay.getDay();
      for (var i = 1; i <= spacing; i++ )
      {
        month.days.push({
          day : -i,
          events: []
        });
      }

      for (var i = 1; i <= daysInMonth; i++)
      {
        var day = {
          day : i,
          events: []
        };
        if (i == currDay)
          day.today = true;
        month.days.push(day);
      }

      $http.get('/api/v3/calendar/'+currYear+'/'+(currMonth+1)).success(function(data) {
        for (var i = 0; i < data.calendar.length; i++)
        {
          var ev = data.calendar[i];
          var date = new Date(ev.date);
          if (self.calendar[date.getFullYear()] &&
            self.calendar[date.getFullYear()].months[date.getMonth()+1])
          {
            self.calendar[date.getFullYear()].months[date.getMonth()+1].days[date.getDate()+spacing-1].events.push(ev.title);
          }
        }
      });
    });
})();