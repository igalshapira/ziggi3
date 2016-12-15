module.exports = function(app) {
    /**
     * @apiGroup buildings
     * @apiName Show list of buildings
     * @apiVersion 3.0.0
     * @api {get} buildings Show list of available buildings
     * @apiSuccess {[]} buildings List of buildings
     * @apiError InternalServerError
     */
    app.get('/api/v3/buildings', function(request, response) {
        app.settings.db.Building.find({},
            { _id: 0, __v: 0, rooms: 0 },
            function(error, buildings) {
                if (error)
                    return response.status(500).send();
                response.json(buildings);
            });
        });
    });
};