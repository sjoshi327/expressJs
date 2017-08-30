let mongoose =require("mongoose");
let Schema =mongoose.Schema;
let BookSchema=new Schema({
	bookName:String,
	rating:String

});

module.exports=mongoose.model("Book",BookSchema);
