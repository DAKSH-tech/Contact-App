const express=require('express');;
const app=express();
const port=8000;
const ejs=require('ejs');
const db=require('./config/mongoose.js');
const Contact=require('./models/contact');
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use('/assets',express.static(__dirname + '/assets'));
// var Contact=[
//   {
//       name:"kjs",
//       phoneNo:"9232"
//   },
//   {
//     name:"ikp",
//     phoneNo:"922"
// }];
app.get('/',function(req,res){
    Contact.find({},function(err,contact){
        if(err){
            console.log('Error in finding contact');return;
        }
    
    return res.render('home',{
        title:'Contact App',
        contact:contact
    });});
});
app.post('/create',function(req,res){
    //   Contact.push(req.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phoneNo
    },function(err,newContact){
        if(err){
            console.log('Error in creating contact');return;
        }
        console.log(newContact);
        return res.redirect('back');
    })
});
app.get('/delete',function(req,res){
    // let contact= Contact.findIndex(contact => Contact.phoneNo === req.params.phoneNo);
    // Contact.splice(contact,1);
    Contact.findByIdAndDelete(req.query.id,function(err){
        if(err){
            console.log('Error in deleting contact');return;
        };
        res.redirect('back');
    })
    
})
app.listen(port,function(err,port){
    if(err){
        console.log('Error in listen server',err);
    }
    console.log('Server is running');
})