module.exports = function(app) {
    /**
     * @apiGroup faculties
     * @apiName List all departments
     * @apiVersion 3.0.0
     * @api {get} departments List of all departments
     * @apiSuccess {[]} departments List of departments
     * @apiError InternalServerError
     */
    app.get('/api/v3/departments', function(request, response) {
        app.settings.db.Department.find({}, { _id: 0, __v: 0 }, function(error, departments) {
            if (error)
                return response.status(500).send();
            response.json(departments);
        });
    });
};