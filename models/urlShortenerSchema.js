const mongoose = require("mongoose");
const urlSchema = mongoose.Schema({
	url:{
		type:String,
	},
	shortUrl:{
		type:String,
	}
})

const UrlModel = mongoose.model('urlShortener',urlSchema);
module.exports = UrlModel;