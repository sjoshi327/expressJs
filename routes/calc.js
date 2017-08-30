var express=require('express')
//var app=express()
var bodyParser=require('body-parser')
var router=express.Router()

router.post('/mul/:id1/:id2',function(req,res){
   var a=parseFloat(req.params.id1);
   var b=parseFloat(req.params.id2)
   var c=a*b;
   //console.log(c)
   res.send(c.toString())
})

router.post('/add/:id1/:id2',(req,res)=>{
   var x=parseFloat(req.params.id1)
   var y=parseFloat(req.params.id2)
   var z=x+y
   res.send(z.toString())
})


module.exports=router;