module.exports = function(app) {
    /**
     * @apiGroup calendar
     * @apiName Get list of calendar events
     * @apiVersion 3.0.0
     * @api {get} calendar Get list of calendar events
     * @apiSuccess {[]} List of events
     * @apiError {json} status Error
     */
    app.get('/api/v3/calendar', function(request, response) {
        app.settings.db.Calendar.find({}, { _id: 0, __v: 0 }, function(error, calendar) {
            response.json({ 
                status: error ? "Error" : "Ok",
                calendar: calendar || []
            });
        });
    });
};