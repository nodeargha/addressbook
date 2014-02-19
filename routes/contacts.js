var Contacts = require("./dbfunctions").Contacts;

exports.allcontacts = function(req, res){
  
  var contacts=new Contacts();
  contacts.getAllContacts(req.session.userid, function(err,rows){
    var datarows="";
    if(err) console.log("Error:"+err);
    else{
      if(rows.length==0)
        datarows="<tr class='danger'><td colspan='100%'>No Contacts...</td></tr>";
      else{
        for(var i=0;i<rows.length;i++){
          datarows+="<tr>";
          datarows+="<td>"+(i+1)+"</td>";
          datarows+="<td>"+rows[i].fname+" "+rows[i].lname+"</td>";
          datarows+="<td>"+rows[i].occupation+"</td>";
          datarows+="<td>"+rows[i].bdate+"</td>";
          datarows+="<td>"+rows[i].adate+"</td>";
          datarows+="<td>"+rows[i].website+"</td>";
          datarows+="<td class='text-center'><a href='/contactform?cid="+rows[i]._id+"><i class='glyphicon glyphicon-edit></i></a>&nbsp;<a href='/delcontact?cid="+rows[i]._id+"><i class='glyphicon glyphicon-trash'></i></a></td></tr>";
        }
      }
    
    }
    
    res.render('contacts', { title: "Contacts", uname: req.session.uname, country: req.session.country, dataRows: datarows });
  });
  
};