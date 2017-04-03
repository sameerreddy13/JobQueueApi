var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
	url: String,
	html: String,
    completed: Boolean
});

module.exports = mongoose.model('Job', JobSchema);

