module.exports = function(mongoose) {
    var hourSchema = mongoose.Schema({
        day: Number,
        startTime: Number,
        endTime: Number,
        room: String
    });

    var groupSchema = mongoose.Schema({
        number: Number,
        type: String,
        lecturer: String,
        hours: [hourSchema]
    });

    var examSchema = mongoose.Schema({
        group: Number,
        startTime: Date,
        rooms: String,
        order: String //Moed
    });

	var courseSchema = mongoose.Schema({
        number: String,
        name: String,
        englishName: String,
        summary: String,
        englishSummary: String,
        year: Number,
        semester: Number,
        homepage: String,
        points: Number,
        hours: Number,
        groups: [groupSchema],
        exams: [examSchema],
        created: Date,
        updated: Date
    });

    return mongoose.model('Course', courseSchema);
};