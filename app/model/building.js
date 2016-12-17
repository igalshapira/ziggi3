module.exports = function(mongoose) {
	var roomsSchema = mongoose.Schema({
		name: String,
		floor: Number,
		comments: String
	});

	var buildingSchema = mongoose.Schema({
        name: String,
        lat: Number,
        lng: Number,
        comments: String,
        rooms: [roomsSchema]
    });

    return mongoose.model('Building', buildingSchema);
};