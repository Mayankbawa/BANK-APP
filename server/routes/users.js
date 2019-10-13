var express = require('express');
var router = express.Router();
var mongo=require('mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req,res){
    var uid=req.body.uid;
    var pwd=req.body.pwd;

    var queryObj={
      uid:uid,
      pwd:pwd
    }

    var mongoClient = mongo.MongoClient;
    var url = "write your own url"
    mongoClient.connect(url,{ useNewUrlParser: true },function(err,project){
         if(err){
             res.send('db connection err');
         }

         var db=project.db('bank');
         var collection=db.collection('users');
         collection.findOne(queryObj,function(e,s){
              if(e){
                  res.send(e);
              }else{
                  res.send(s);
              }
         }) 
    })
});


  router.post('/createacc', function(req,res){
    var uid = req.body.uid;
    var pwd = req.body.pwd;
    var accno = req.body.accno;
    var name = req.body.name;
    var phno = req.body.phno;
    var email = req.body.email;
    var role = req.body.role;
    var acctype = req.body.acctype;
    var amt = req.body.amt;
    amt = Number(amt);

    var userObj={
        uid: uid,
        pwd: pwd,
        accno: accno,
        name: name,
        phno: phno,
        email: email,
        role: role,
        acctype: acctype,
        amount: amt
    };

    var transObj={
         accno:accno,
         name:name,
         transactions : []
     }

     var mongoClient = mongo.MongoClient;
   var url = "write your own url"
    mongoClient.connect(url,{ useNewUrlParser: true },function(err,project){
         if(err){
             res.send('db connection err');
         }

         var db=project.db('bank');
         var users=db.collection('users');
         var transaction = db.collection('transaction');

         users.insertOne(userObj,function(e,s){
              if(e){
                  res.send(e);
              }else{

                transaction.insertOne(transObj,function(e,s){
                  if(e){
                    res.send(e);
                  }else{
                    res.send(s);
                  }
                }) 
                  
              }
         }) 

         
    })

  });

module.exports = router;
