var Users = require('./dbfunctions').Users;
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Address Book', err: '' });
};

exports.signin= function(req, res){
  var users=new Users();
  var userid=req.body.userid;
  var password=req.body.tpassword;
  users.getUser(userid, function(err,rows){
    if(err){
      console.log("Signin "+err);
      res.render('index', {title: 'Address Book', err: err});
    }
    else{
      if(!rows){
        console.log("Signin "+err);
        res.render('index', { title: 'Address Book', err: 'This user id or password you entered is incorrect'});
      }
      else{
        if(password==rows.password){
          req.session.userid=userid;
          req.session.uname= rows.uname;
          req.session.country=rows.country;
          res.redirect('/userhome');
        }
        else
          res.render('index', { title: 'Address Book', err: 'This user id or password you entered is incorrect'});
      }
    }
  });
};