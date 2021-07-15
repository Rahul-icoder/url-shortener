const express = require("express");
require('./helpers/init_mongodb')
const UrlModel = require('./models/urlShortenerSchema')
const path = require("path");
const ejs = require('ejs')
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.static(path.join(__dirname,'/public')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs')

app.get('/',(req,res,next)=>{
	res.render('index')
})

app.post('/',async(req,res,next)=>{
	try{
		const {url,slug} = req.body
		if(!url) throw new Error('url not valid')
		const urlExits = await UrlModel.findOne({url})
		if(urlExits){
			res.render('index',{shortUrl:`${urlExits.shortUrl}`});
			return;
		}
		const urlModel = new UrlModel({url:url,shortUrl:slug})
		const result = await urlModel.save();
		res.render('index',{shortUrl:`${result.shortUrl}`});
	}catch(error){
		next(error)
	}
})

app.get('/:shortUrl',async(req,res,next)=>{
	try{
		const result = await UrlModel.findOne({shortUrl:`${req.params.shortUrl}`})
		if(!result) throw new Error('Url is not valid')
		res.redirect(result.url);
	}catch(error){
		next(error)
	}
})

app.use((req,res,next)=>{
	const err =	new Error('NOT FOUND')
	err.status = 'fail'
	err.statusCode = 404;
	next(err)
})

app.use((err,req,res,next)=>{
	err.statusCode = err.statusCode || 500;
	res.status(err.statusCode).render('index',{
		status : err.status || "error",
		message : err.message
	})
})

app.listen(PORT,()=>{
	console.log(`🌏🌏 listening on ${PORT}`)
})