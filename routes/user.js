
var Users=require('./dbfunctions').Users;
/*
 * GET users listing.
 */

exports.signupform = function(req, res){
  res.render('signup', {title: 'User Signup', err:''});
};

exports.adduser= function(req,res){
  var users = new Users();
  var userid=req.body.userid;
  var password=req.body.tpassword;
  var uname=req.body.uname;
  var emailid=req.body.emailid;
  var country=req.body.country;
  var udatetime=new Date().getFullYear()+"-"+("0"+(new Date().getMonth()+1)).slice(-2)+"-"+("0"+new Date().getDate()).slice(-2)+" "+("0"+new Date().getHours()).slice(-2)+":"+("0"+new Date().getMinutes()).slice(-2)+":"+("0"+new Date().getSeconds()).slice(-2);
  
  var insertData={_id: userid, password: password, uname:uname, emailid:emailid, country:country, udatetime:udatetime};
  users.insertUsers(insertData, function(err, info){
    if(err){
      console.log("Insertion failed: "+err);
      res.render('signup', {title: 'User Signup',err:'Insertion failed'});
    }
    else
      res.redirect('/');
  });
};

exports.userhome = function(req, res){
  res.end("Welcome "+req.session.userid);
};