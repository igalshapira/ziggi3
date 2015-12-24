module.exports = function(mongoose) {
	 var courseSchema = mongoose.Schema({
        number: String,
        name: String,
        english: String
    });

	var searchSchema = mongoose.Schema({
        year: Number,
        semester: Number,
        phrase: String,
        department: Number,
        degreeYear: Number,
        generalCourses: Boolean,
        updated: Date,
        courses: [courseSchema]
	});

	return mongoose.model('Search', searchSchema);
};