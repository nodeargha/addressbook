var DBConnection= require('./dbcon').DBConnection,
	con;
//************************************************
//		Users functions
//************************************************

Users = function(){
	con=new DBConnection();
};

Users.prototype.insertUsers= function(insertData, callback){
	con.connect(function(err, db){
		if(err) callback(err);
		else{
			if(typeof(insertData)=='undefined')
				insertData=[insertData];
			db.users.insert(insertData, function(error,info){
				if(error) callback(error);
				else callback(null,info);
			});
		}
	});
};

Users.prototype.getUser = function(userid,callback){
	con.connect(function(err, db){
		if(err) callback(err);
		else{
			var criteria={_id: userid}
			db.users.findOne(criteria, function(error, row){
				if(error) callback(error);
				else callback(null, row);
			});
		}
	});
};

//************************************************
//		Contacts functions
//************************************************

Contacts=function(){
  con=new DBConnection();
};

Contacts.prototype.getAllContacts = function(userid, callback){
  con.connect(function(err, db){
    if(err) callback(err);
    else{
      var criteria={_id: userid};
      db.contacts.find(criteria).toArray(function(error, rows){
		  if(error) callback(error);
		  else callback(null, rows);
	  });
    }
  });
};

Contacts.prototype.insertContact = function(insertData, callback){
  con.connect(function(err, db){
    if(err)callback(err);
    else{
      if(typeof(insertData)=='undefined')
        insertData=[insertData];
      db.contacts.insert(insertData,function(error,info){
        if(error) callback(error);
        else callback(null, info);
      });
    }
  });
};

exports.Users=Users;
exports.Contacts=Contacts;