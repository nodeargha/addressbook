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

exports.Users=Users;