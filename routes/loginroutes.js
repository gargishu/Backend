var mysql = require('mysql');
// var bcrypt = require('bcrypt');
var jsonfile = require('jsonfile');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ishu',
  database : 'bank_db',
  insecureAuth: false
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn",err);
}
});

exports.register = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  // bcrypt.hash(req.body.password, 5, function( err, bcryptedPassword) {
   //save to db
   var users={
    
     "username":req.body.username,
     "password":req.body.password,
     "amount":req.body.amount,
     "address":req.body.address,
     "phone":req.body.phone
   }
   connection.query('INSERT INTO record SET ?',users, function (error, results, fields) {
   if (error) {
     console.log("error ocurred",error);
     res.send({
       "code":400,
       "failed":"error ocurred"
     })
   }else{
    //  console.log('The solution is: ', results);
     res.send({
       "code":200,
       "success":"user registered sucessfully"
         });
   }
   });
   }




exports.login = function(req,res){
  var username= req.body.username;
  var password = req.body.password;
  connection.query('SELECT * FROM record WHERE username = ?',[username], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results[0].password,req.body.password,req.body.role);
    if(results.length >0){
      if(results[0].password == req.body.password){
          // var file = './userdata/userid.json'
          var obj = {username: req.body.username}
         
            res.send({
            "code":200,
            "success":"login sucessfull"
          })
        }
		res.send({
			"code" :204,
			"success":"failed login"
		})
      }
  }

});
}
