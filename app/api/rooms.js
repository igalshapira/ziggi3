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

    /**
     * @apiGroup building
     * @apiName Get building information
     * @apiVersion 3.0.0
     * @api {get} buildings Show list of available buildings
     * @apiParam {string} name Building name
     * @apiSuccess {} building data
     * @apiError BuildingNotFound
     */
    app.get('/api/v3/buildings/:name', function(request, response) {
        var name = request.params.name;
        app.settings.db.Building.find(
            { "name" : new RegExp(name, 'i') },
            { _id: 0, __v: 0 },
            function(error, building) {
                if (error || building.length == 0)
                    return response.status(404).send("BuildingNotFound");
                response.json(building[0]);
            });
    });
};