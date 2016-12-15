module.exports = function(app) {
    var config = app.get('config');
    var uni = require('./uni/' + config.university)();

    /**
     * @apiGroup Courses
     * @apiName Search for courses
     * @apiVersion 3.0.0
     * @api {post} courses Search for course by name
     * @apiParam {String} string Search string to search courses by
     * @apiParam {Number} year Search string to search courses by
     * @apiParam {Number} semester Search string to search courses by
     * @apiSuccess {string[]} id IDs of matching courses
     * @apiSuccess {string[]} name Names of matching courses
     * @apiSuccess {string[]} english English names of matching courses
     * @apiError InternalServerError
     * @apiError BadRequest
     */
    app.post('/api/v3/courses', function(request, response) {
        request.checkBody('string', 'Invalid search string').notEmpty().isMinLength(3);
        request.checkBody('year', 'Invalid year').isInt().isYear();
        request.checkBody('semester', 'Invalid semester').isInt().isSemester();
        if (request.validationErrors())
            return response.send(400).send(request.validationErrors());

        var Search = app.get('db').Search;
        var string = request.body.string;
        var year = request.body.year;
        var semester = request.body.semester;

        Search.findOne({
            "year" : year,
            "semester" : semester,
            "phrase" : string
        }, '-courses._id', function(err, results) {
            if (err)
                return response.status(500).send();

            if (results || config.cacheOnly)
            {
                return response.json(results ? results.courses : []);
            }

            uni.searchCourses(string, year, semester,
                function(courses) {
                    if (courses)
                        courses.updated = new Date();
                    else
                        return response.status(404).send();
                    
                    Search.create({
                        year: year,
                        semester: semester,
                        phrase: string,
                        updated: new Date(),
                        courses: courses || []
                    }, function(err) {
                        if (err)
                            return response.status(500).send();
                        response.json(courses);
                    });
                    
                });
            });
      });

    /**
     * @apiGroup Courses
     * @apiName Get course data
     * @apiVersion 3.0.0
     * @api {post} course Get course information
     * @apiParam {String} number Course ID to retrieve information
     * @apiParam {Number} year
     * @apiParam {Number} semester
     * @apiSuccess {json} Course Course information. If without a name, then course is not available
     * @apiError BadRequest
     */
    app.post('/api/v3/course', function(request, response) {
        request.checkBody('number', 'Invalid course number').notEmpty().isMinLength(8);
        request.checkBody('year', 'Invalid year').isInt().isYear();
        request.checkBody('semester', 'Invalid semester').isInt().isSemester();
        if (request.validationErrors())
            return response.send(400).send(request.validationErrors());

        var Course = app.get('db').Course;
        var number = uni.normalizeNumber(request.body.number);
        var year = request.body.year;
        var semester = request.body.semester;
        Course.findOne( {
            "year" : year,
            "semester" : semester,
            "number" : number
        }, '-_id -__v -groups._id -groups.hours._id -exams._id', function(err, course) {
            if (err)
                return response.status(500).send();
            
            if (course || config.cacheOnly)
                return response.json(course);

            uni.courseInfo(number, year, semester, 
                function(course) {
                    if (course)
                        course.created = course.updated = new Date();
                    else
                        return response.status(500).send();

                    Course.create(course, function(err)
                    {
                        if (err)
                            return response.status(500).send();
                        response.json(course);
                    });
                });
        });
      });

    /**
     * @apiGroup Courses
     * @apiName Get available general courses
     * @apiVersion 3.0.0
     * @api {post} general_courses Get available general courses
     * @apiParam {Number} year School year
     * @apiParam {Number} semester Chosen semester (1,2,3)
     * @apiParam {Number} department Department number
     * @apiParam {Number} degree_year Year of studying
     * @apiSuccess {json} Courses List of available courses
     * @apiError BadRequest
     */
    app.post('/api/v3/general_courses', function(request, response) {
        request.checkBody('year', 'Invalid year').isInt().isYear();
        request.checkBody('semester', 'Invalid semester').isInt().isSemester();
        request.checkBody('department', 'Invalid department').isInt();
        request.checkBody('degree_year', 'Invalid degree year').isInt();
        if (request.validationErrors())
            return response.send(400).send(request.validationErrors());

        // Look in cache first //TODO
        var year = request.body.year;
        var semester = request.body.semester;
        var department = request.body.department;
        var degree_year = request.body.degree_year;

        // If not cache
        uni.generalCourses(year, semester, department, degree_year,
            function(courses) {
                if (!course)
                    response.status(404);

                // Add to cache //TODO
                response.json({
                    status: courses ? "Ok" : "Error",
                    courses: courses || []
                });
            });
      });
};