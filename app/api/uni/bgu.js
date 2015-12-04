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

    return {
    	searchCourses: function(string, year, semester, next) {
            var postData = "";
            postData = postData + "oc_course_name="+hebUrlEncode(string);
            postData = postData + "&on_year=" + year;
            postData = postData + "&on_semester=" + semester;
            postData = postData + "&step=1";
            postData = postData + "&on_course_ins=0";

            postData= postData + "&on_course_department=&on_course_ldegree_level=&on_course_degree_level=&on_course=&on_hours=&on_credit_points=&oc_lecturer_first_name=&oc_lecturer_last_name=&oc_end_time=&oc_start_time=&on_campus=";

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

        courseInfo: function(number, year, semester, next) {
            var number = number.replace(/[^0-9]/g, "");
            var dep = number.substr(0, 3);
            var level = number.substr(3, 1);
            var crs = number.substr(4, 4);

            var postData = "";
            postData = postData + "rn_course_department="+dep;
            postData = postData + "&rn_course_degree_level="+level;
            postData = postData + "&rn_course="+crs;
            postData = postData + "&rn_year=" + year;
            postData = postData + "&rn_semester=" + semester;
            postData = postData + "&rn_institution=0";

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
              console.log(res.statusCode);
                if (res.statusCode !== 200)
                    return next(null);

                  var chunks = [];
                  res.on('data', function(chunk) {
                    chunks.push(chunk);
                  })
                  .on('end', function() {
                     var html = iconv.decode(Buffer.concat(chunks), 'win1255');
                     var $ = cheerio.load(html);
                     
                     tds = $('form#mainForm td.BlackText')

                     if (!tds || tds.length == 0)
                         return next(null);

                      course = {
                        number: $(tds[0]).text().trim(),
                        name: $(tds[1]).text().trim(),
                        homepage: $('a', $(tds[1])).attr('href'),
                        points: $(tds[3]).text().trim(),
                        hours: $(tds[4]).text().trim(),
                        groups: [],
                        exams: []
                      };

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