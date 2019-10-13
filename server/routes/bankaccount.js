var express = require('express');
var router = express.Router();
var mongo=require('mongodb');

router.get('/get-acc', function (req, res) {
    var accno = req.query.accno;

    var query = {
        accno: accno
    }

    var mongoClient = mongo.MongoClient;
    var url = "mongodb+srv://manku:manku@cluster0-u9dbl.mongodb.net/test?retryWrites=true&w=majority"
    
    mongoClient.connect(url,{ useNewUrlParser: true },function(err,project){
         if(err){
             res.send('db connection err');
         }

         var db=project.db('bank');
         var collection=db.collection('users');
         collection.findOne(query,function(e,s){
              if(e){
                  res.send(e);
              }else{
                  res.send(s);
              }
         }) 
    })
})



router.post('/deposit',function(req,res){
     var accno=req.body.accno;
     var name=req.body.name;
     var amt =req.body.amt;
     var date=req.body.date;
     amt = amt;

     var dataObj={
             date: date,
             amount: amt,
             type: 'credit'
     }

     var query = {
         accno: accno
     }

     var mongoClient = mongo.MongoClient;
     var url = "mongodb+srv://manku:manku@cluster0-u9dbl.mongodb.net/test?retryWrites=true&w=majority"
     mongoClient.connect(url,{ useNewUrlParser: true },function(err,project){
          if(err){
              res.send('db connection err');
          }
 
          var db=project.db('bank');
          var transaction=db.collection('transaction');
         

          var users=db.collection('users');

          transaction.updateOne(query, {$push: {transactions: dataObj} }, function(e,s){
               if(e){ 
                   res.send(e);
               }else{
                users.updateOne(query,{ $inc: { amount : parseInt(amt) } },function(e,s){
               if(e){ 
                   res.send(e);
               }else{

                   res.send(s);
               }
          })
               }
          })
     })
})


//update customer details


    router.post('/cust-update', function(req, res){
    
    var uid = req.body.uid;
    var pwd = req.body.pwd;
    var accno = req.body.accno;
    var name = req.body.name;
    var phno = req.body.phno;
    var email = req.body.email;
    var role = req.body.role;
    var acctype = req.body.acctype;

    var filter ={
         accno: accno
    }

    var queryObj={
        uid: uid,
        pwd: pwd,
        accno: accno,
        name: name,
        phno: phno,
        email: email,
        role: role,
        acctype: acctype
    };

     var mongoClient = mongo.MongoClient;
    var url = "mongodb+srv://manku:manku@cluster0-u9dbl.mongodb.net/test?retryWrites=true&w=majority"
    mongoClient.connect(url,{ useNewUrlParser: true },function(err,project){
         if(err){
             res.send('db connection err');
         }

         var db=project.db('bank');
         var collection=db.collection('users');
         collection.updateOne(filter,{$set:queryObj}, function(e,s){
              if(e){
                  res.send(e);
              }else{
                  res.send(s);
              }
         }) 
    })

  });



  //get trasactions

  router.get('/get-transac', function(req,res){

    var accno = req.query.accno;

    var query = {
        accno: accno
    }

    var mongoClient = mongo.MongoClient;
    var url = "mongodb+srv://manku:manku@cluster0-u9dbl.mongodb.net/test?retryWrites=true&w=majority"
    mongoClient.connect(url,function(err,project){
        if(err){
            res.send('db error');
        }

        var db=project.db('bank');
        var collection=db.collection('transaction');

        collection.findOne(query, { useUnifiedTopology: true }, function(e,s){
            if(e){
                res.send(e);
            }else{
                res.send(s);
            }
        })
    })
})



router.get('/get-user',function(req,res){
     var mongoClient = mongo.MongoClient;
   var url = "mongodb+srv://manku:manku@cluster0-u9dbl.mongodb.net/test?retryWrites=true&w=majority"
    mongoClient.connect(url,function(err,project){
        if(err){
            res.send('db error');
        }

        var db=project.db('bank');
        var collection=db.collection('users');

        collection.find({}).toArray(function(e,s){
            if(e){
                res.send(e);
            }else{
                res.send(s);
            }
        })
    })
})


router.post('/withdraw',function(req,res){
    var accno=req.body.accno;
    var name=req.body.name;
    var amt =req.body.amt;
    var date=req.body.date;
    am = -amt;

    var dataObj={
            date: date,
            amount: amt,
            type: 'debit'
    }

    var query = {
        accno: accno
    }

    var mongoClient = mongo.MongoClient;
    var url = "mongodb+srv://manku:manku@cluster0-u9dbl.mongodb.net/test?retryWrites=true&w=majority"
    mongoClient.connect(url,{ useNewUrlParser: true },function(err,project){
         if(err){
             res.send('db connection err');
         }

         var db=project.db('bank');
         var transaction=db.collection('transaction');
        

         var users=db.collection('users');

         transaction.updateOne(query, {$push: {transactions: dataObj} }, function(e,s){
              if(e){ 
                  res.send(e);
              }else{
               users.updateOne(query,{ $inc: { amount : parseInt(am) } },function(e,s){
              if(e){ 
                  res.send(e);
              }else{
                res.send(s);
              }
         })
              }
         })
    })
})


router.get('/all-transac',function(req,res){
    var mongoClient = mongo.MongoClient;
    var url = "mongodb+srv://manku:manku@cluster0-u9dbl.mongodb.net/test?retryWrites=true&w=majority"
   mongoClient.connect(url,function(err,project){
       if(err){
           res.send('db error');
       }

       var db=project.db('bank');
       var collection=db.collection('transaction');

       collection.find({}).toArray(function(e,s){
           if(e){
               res.send(e);
           }else{
               res.send(s);
           }
       })
   })
})



module.exports = router;