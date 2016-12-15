module.exports = function(app) {
    /**
     * @apiGroup semesters
     * @apiName Show list of semesters
     * @apiVersion 3.0.0
     * @api {get} semesters Show list of available semesters
     * @apiSuccess {[]} semesters List of semesters
     * @apiError InternalServerError
     */
    app.get('/api/v3/semesters', function(request, response) {
        app.settings.db.Semester.find({}, { _id: 0, __v: 0 }, function(error, semesters) {
            if (error)
                return response.status(500).send();
            response.json(semesters);
        });
    });
};