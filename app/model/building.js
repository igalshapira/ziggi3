module.exports = function(mongoose) {
	var buildingSchema = mongoose.Schema({
        name: String,
        lat: Number,
        lng: Number,
        comments: String
    });

    return mongoose.model('Building', buildingSchema);
};