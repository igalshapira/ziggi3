module.exports = function(app) {
    /**
     * @apiGroup Building and rooms
     * @apiName ListBuildings
     * @apiVersion 3.0.0
     * @api {get} buildings List all buildings
     * @apiSuccess {Object[]} buildings List of buildings
     * @apiSuccess {string} buildings.name
     * @apiSuccess {Number} buildings.lat
     * @apiSuccess {Number} buildings.lng
     * @apiSuccess {string} buildings.comments
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
     * @apiGroup Building and rooms
     * @apiName Get building information
     * @apiVersion 3.0.0
     * @api {get} buildings/:name Get specific building data
     * @apiParam {string} name Building name
     * @apiSuccess {string} name
     * @apiSuccess {Number} lat
     * @apiSuccess {Number} lng
     * @apiSuccess {string} comments
     * @apiSuccess {Object[]} rooms
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