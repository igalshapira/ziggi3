module.exports = function(mongoose) {
    var semesterSchema = mongoose.Schema({
        name: String,
        year: Number,
        semester: Number,
        startDate: Date,
        endDate: Date,
        examsStart: Date,
        examsEnd: Date
    });

    return mongoose.model('Semester', semesterSchema);
};