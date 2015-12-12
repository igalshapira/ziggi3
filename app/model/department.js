module.exports = function(mongoose) {
	var departmentSchema = mongoose.Schema({
		number: Number,
        name: String
    });

    return mongoose.model('Department', departmentSchema);
};