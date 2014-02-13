var database,
    collections;

DBConnection= function(){
	database="addressbook";
	collections=['users', 'contacts'];
};

DBConnection.prototype.connect = function(callback){
	var db=require("mongojs").connect(database,collections);
	if(db) callback(null,db);
	else callback("Connection failed...");
};

exports.DBConnection=DBConnection;
