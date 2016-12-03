module.exports = function(app) {
    /**
     * @apiGroup calendar
     * @apiName Get list of calendar events
     * @apiVersion 3.0.0
     * @api {get} calendar Get list of calendar events
     * @apiParam {Number[2015-2099]} [year] Selected year
     * @apiParam {Number[1-12]} [month] Selected month
     * @apiSuccess {[]} List of events
     * @apiError {json} status Error
     */
    app.get('/api/v3/calendar/:year?/:month?', function(request, response) {
        request.checkParams('year', 'Invalid year').optional().isInt().isYear();
        request.checkParams('month', 'Invalid month').optional().isInt().isMonth();
        if (request.validationErrors())
            return response.json({ status: request.validationErrors() });

        var year = parseInt(request.params.year);
        var month = parseInt(request.params.month);
        var query = {};
        if (!isNaN(month))
        {
            query = {
                "date" : {
                    "$gte" : new Date(year, month-1),
                    "$lt" : new Date(year, month)
                }
            }
        }
        else if (!isNaN(year))
        {
            query = {
                "date" : {
                    "$gte" : new Date(year, 0),
                    "$lt" : new Date(year+1, 0)
                }
            }
        }
        app.settings.db.Calendar.find(query, { _id: 0, __v: 0 }, function(error, calendar) {
            response.json({ 
                status: error ? "Error" : "Ok",
                calendar: calendar || []
            });
        });
    });
};