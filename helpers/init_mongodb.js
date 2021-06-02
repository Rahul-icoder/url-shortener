const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017',{
	dbName:"url",
	useUnifiedTopology:true,
	useFindAndModify:true,
	useNewUrlParser:true,
	useCreateIndex:false
}).then(()=>{
	console.log('connected to mongoose')
})