module.exports = function(mongoose) {
	var calendarSchema = mongoose.Schema({
		type: String, // HebHoliday
		date: Date, //Georgian date
		title: String
    });

    return mongoose.model('Calendar', calendarSchema);
};