var express = require('express');
const session = require('express-session');
var router = express.Router();

var credentials = {
    email:"abc@gmail.com",
    password:"abc123"
}

router.post('/login',(req,res)=>{
    if(req.body.email == credentials.email && req.body.password == credentials.password)
    {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
    }
    else{
        
        res.end("Error");
    }

});

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }
    else {
      res.send("Unauthorized");
      console.log(req.session.user);
    }
});

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send("Error");
        }else{
            res.render('base',{logout:"Logout Successful"})
        }
    })
})

module.exports = router;