module.exports = function(app) {
    /**
     * @apiGroup faculties
     * @apiName List all departments
     * @apiVersion 3.0.0
     * @api {get} departments List of all departments
     * @apiSuccess {[]} departments List of departments
     * @apiError {json} status Error
     */
    app.get('/api/v3/departments', function(request, response) {
        app.settings.db.Department.find({}, { _id: 0, __v: 0 }, function(error, departments) {
            response.json({ 
                status: error ? "Error" : "Ok",
                departments: departments || []
            });
        });
    });
};