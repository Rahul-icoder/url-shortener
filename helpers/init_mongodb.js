const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI,{
	useUnifiedTopology:true,
	useFindAndModify:true,
	useNewUrlParser:true,
	useCreateIndex:false
}).then(()=>{
	console.log('connected to mongoose')
}).catch(err=>{
	console.log(err.message)
})
