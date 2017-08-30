var express=require('express');
var bodyParser=require('body-parser');
var cors=require('cors');
var app=express();
var mongoose=require('mongoose');
var Book=require('./model/schema');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port=process.env.Port ||5555;
var router=express.Router();
mongoose.connect('mongodb://localhost/book');

app.use(function(req,res,next){
	console.log('Use It');
	next();

});




app.post('/insert', function(req, res) {

    var lib = new Book();  
    lib.bookName = req.body.bookName;  
    lib.rating = req.body.rating;  
    
    lib.save(function (err) {  
        if (err) {  
            res.send(err);  
        }  
        res.send({ message: 'Book Data Saved !' })  
    })  
});  



app.get('/find', function(req, res, next) {
  Book.find(function(err,bookResult){
  	if(err){
  		res.send("Error Retrieving Books");
  	} else{
  		console.log(bookResult);
  		res.json(bookResult);
  	}
  });
  });
  



app.put('/update/:bookName',function (req, res) {  
  
    Book.findOneAndUpdate({bookName:req.params.bookName},
	{$set:{bookName:req.body.bookName,rating:req.body.rating}},
	{upsert:true},function(err,lib){
	if (err) {  
            res.send(err);  
        } 
else{
    
    res.json(lib);
}		
    });  
}); 




app.delete('/delete/:bookName',function (req, res) {  
	Book.findOneAndRemove({
		bookName:req.params.bookName
	},function(err,lib){
		if(err){
			res.send('error')
		}else{
			res.send("Data Deleted Sucessfully")}
		});
	});
  

app.use(cors());
app.use('/api', router);
app.listen(port);
console.log('REST API is runnning at ' + port);
module.exports=app;
