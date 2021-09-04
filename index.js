const express=require('express');;
const app=express();
const port=8000;
const ejs=require('ejs');
var bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use('/assets',express.static(__dirname + '/assets'));
var Contact=[
  {
      name:"Dkahs",
      phoneNo:"9232"
  }

];
app.get('/',function(req,res){
    
    return res.render('home',{
        title:'Contact App',
        contact:Contact
    })
});
app.post('/create',function(req,res){
      Contact.push(req.body);
      return res.redirect('back');
})
app.listen(port,function(err,port){
    if(err){
        console.log('Error in listen server',err);
    }
    console.log('Server is running');
})