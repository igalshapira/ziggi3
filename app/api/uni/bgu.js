var https = require('https');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

module.exports = function() {

    function hebUrlEncode(string)
    {
        var u = "";
        for (var i = 0; i < string.length; i++)
        {
            var code = string.charCodeAt(i);
            if (code > 256)
            {
                u = u + "%" + (code%256+16).toString(16).toUpperCase();;
            }
            else if (code === 32)
                u = u + "+"
            else
                u = u + string.charAt(i);
        }
        return u;
    }

    function timeStringToTime(timeString)
    {
      var t = timeString.match(/([0-9].)[^0-9]([0-9].)/);
      if (!t || t.length != 3)
        return 0;
      return Number(t[1]) + t[2]/60;
    }

    function postQuery(data) {
      var postData = "";
      for (d in data)
        postData += d+"="+data[d]+"&";
      // Remove last &
      return postData.substr(0, postData.length-1);
    }

    function normalizeNumber(courseNumber) {
        var number = courseNumber.replace(/[^0-9]/g, "");
        var dep = number.substr(0, 3);
        var level = number.substr(3, 1);
        var crs = number.substr(4, 4);
        return dep + "." + level + "." + crs;
    }

    return {
      normalizeNumber: normalizeNumber,

    	searchCourses: function(string, year, semester, next) {
            var data = {
               "oc_course_name" : hebUrlEncode(string),
               "on_year" : year,
               "on_semester" : semester,
               "step" : 1,
               "on_course_ins" : 0,
               "on_course_department" : "",
               "on_course_ldegree_level" : "",
               "on_course_degree_level" : "",
               "on_course" : "",
               "on_hours" : "",
               "on_credit_points" : "",
               "oc_lecturer_first_name" : "",
               "oc_lecturer_last_name" : "",
               "oc_end_time" : "",
               "oc_start_time" : "",
               "on_campus" : ""
            };
            var postData = postQuery(data);
            var options = {
                hostname: 'bgu4u.bgu.ac.il',
                path: '/pls/scwp/!sc.AnnualCoursesAdv',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': postData.length
                }
            };

            var req = https.request(options, function(res) {
                if (res.statusCode !== 200)
                    return next(null);

                  var chunks = [];
                  res.on('data', function(chunk) {
                    chunks.push(chunk);
                  })
                  .on('end', function() {
                     var html = iconv.decode(Buffer.concat(chunks), 'win1255');
                     var courses = [];
                     var $ = cheerio.load(html);
                     //var hd = $('td.BlueInputKind')
                     //semester = hd[2].text.trim if hd[2]
                     var tds = $('td.BlackTextEng'); // English name of course
                     for (var i = 0; i < tds.length; i++)
                     {
                        var p = $(tds[i]).parent();
                        courses.push(
                        {
                            number: $(p.children('td')[3]).text().trim(),
                            name: $('a', p).text().trim(),
                            english: $(tds[i]).text().trim(),
                            //semester: semester
                        });
                     }

                     return next(courses);
                  });
                });
            req.write(postData, function(err) {
                  req.end();
               });
            req.on('error', function(e) {
                    next(null);
                });
        },

        courseInfo: function(courseNumber, year, semester, next) {
            var number = courseNumber.replace(/[^0-9]/g, "");
            var dep = number.substr(0, 3);
            var level = number.substr(3, 1);
            var crs = number.substr(4, 4);
            var data = {
              "rn_course_department" : dep,
              "rn_course_degree_level" : level,
              "rn_course" : crs,
              "rn_year" : year,
              "rn_semester" : semester,
              "rn_institution" : 0   
            };
            var postData = postQuery(data);

            var options = {
                hostname: 'bgu4u.bgu.ac.il',
                path: '/pls/scwp/!sc.AnnualCourseSemester',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': postData.length
                }
            };

            var req = https.request(options, function(res) {
                if (res.statusCode !== 200)
                    return next(null);

                  var chunks = [];
                  res.on('data', function(chunk) {
                    chunks.push(chunk);
                  })
                  .on('end', function() {
                     var html = iconv.decode(Buffer.concat(chunks), 'win1255');

                     // hideous hack to fix dangled </td> in BGU exams table, which breaks cheerio
                     html = html.replace(/<\/td><\/td>/g, "</td>");
                     var $ = cheerio.load(html);
                     
                     tds = $('form#mainForm td.BlackText')

                     var course = {
                        year: year,
                        semester: semester,
                        number: normalizeNumber(courseNumber)
                      };

                     if (!tds || tds.length == 0)
                         return next(course);

                      course.name = $(tds[1]).text().trim();
                      course.homepage = $('a', $(tds[1])).attr('href');
                      course.points = $(tds[3]).text().trim();
                      course.hours = $(tds[4]).text().trim();
                      course.groups = [];
                      course.exams = [];

                      var group = null;
                      var trs = $("tr", $('form#mainForm table')[2]);
                      for (var t = 2; t < trs.length; t++)
                      {
                          var row = trs[t];
                          var tds = $("td", row);

                          // Skip some padding lines
                          if (tds.length != 11)
                            continue;

                          // Group number can be a link
                          var number = parseInt($("a", row).text());

                          // Or without a link
                          if (isNaN(number))
                            number = parseInt($(tds[7]).text());

                          // Or no group number - This is the same group from previous row
                          if (!isNaN(number))
                          {
                            if (group !== null)
                              course.groups.push(group);

                            group = {
                              "number": number,
                              "type": $(tds[9]).text().trim(),
                              "lecturer": $(tds[5]).text().trim(),
                              "hours": []
                            }
                          }
                          var hours = {
                            "room": $(tds[1]).text().trim()
                          };
                          var h = $(tds[3]).text().match(/ ([^ ]) ([0-9][0-9]:[0-9][0-9]) - ([0-9][0-9]:[0-9][0-9])/);
                          if (h && h.length == 4)
                          {
                              hours['day'] = h[1].charCodeAt(0) - 'א'.charCodeAt(0) + 1;
                              hours['startTime'] = timeStringToTime(h[3]);
                              hours['endTime'] = timeStringToTime(h[2]);
                          }
                          group.hours.push(hours);

                      }
                      if (group !== null)
                        course.groups.push(group);

                      //Exams
                      var group = 0;
                      if ($('form#mainForm table')[4])
                      {
                        var trs = $("tr", $('form#mainForm table')[4]);
                        for (var t = 1; t < trs.length; t++)
                        {
                          var row = trs[t];
                          var tds = $("td", row);
                          if (tds.length != 7 && tds.length != 5)
                            continue;
                          if (tds.length == 7)
                            group = parseInt($(tds[4]).text());

                          var startTime = null;
                          var d = $(tds[2]).text().match(/([0-9]{2})\/([0-9]{2})\/([0-9]{4})[^0-9]*([0-9]{2}):([0-9]{2})/);
                          if (d.length == 6)
                            startTime = new Date(d[3]+'-'+d[2]+'-'+d[1] + 'T'+d[4]+':'+d[5]+':00.000Z');
                          course.exams.push({
                            group: group,
                            startTime: startTime,
                            rooms: $(tds[1]).text().trim(),
                            order: $(tds[3]).text().trim(),
                          });
                        }
                      }
                      return next(course);
                  });
                });
            req.write(postData, function(err) {
                  req.end();
               });
            req.on('error', function(e) {
                    console.error('Error', e);
                    next(null);
                });
        },

        generalCourses: function(year, semester, department, degree_year, next) {
            var postData = "cmdkey=PROD&server=rep_aristo4stu4_FRHome1&report=acrr008w&desformat=html" +
                           "&DESTYPE=cache&P_PATH=&P_SPEC=&P_YEAR_DEGREE=&P_SORT=1&P_WEB=1&P_SPECIAL_PATH=0";
            postData = postData + "&P_YEAR=" + year;
            postData = postData + "&P_SEMESTER=" + semester;
            postData = postData + "&P_DEGREE_LEVEL=" + 1;
            postData = postData + "&P_DEPARTMENT=" + department;
            postData = postData + "&P_GLOBAL_COURSES=" + 3; //Global courses only!

            var options = {
                hostname: 'reports4u.bgu.ac.il',
                path: '/reports/rwservlet',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': postData.length
                }
            };
            var req = https.request(options, function(res) {
                if (res.statusCode !== 200)
                    return next(null);

                  var chunks = [];
                  res.on('data', function(chunk) {
                    chunks.push(chunk);
                  })
                  .on('end', function() {
                     var html = iconv.decode(Buffer.concat(chunks), 'win1255');
                     var courses = html.match(/[0-9]{3}[.][0-9][.][0-9]{4}/g);
                     return next(courses);
                  });
                });
            req.write(postData, function(err) {
                  req.end();
               });
            req.on('error', function(e) {
                    next(null);
            });
        }
    }
};