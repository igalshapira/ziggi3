module.exports = function(app) {
    /**
     * @apiGroup buildings
     * @apiName Show list of buildings
     * @apiVersion 3.0.0
     * @api {get} buildings Show list of available buildings
     * @apiSuccess {[]} buildings List of buildings
     * @apiError {json} status Error
     */
    app.get('/api/v3/buildings', function(request, response) {
        app.settings.db.Building.find({}, { _id: 0, __v: 0 }, function(error, buildings) {
            response.json({ 
                status: error ? "Error" : "Ok",
                buildings: buildings || []
            });
        });
    });
};