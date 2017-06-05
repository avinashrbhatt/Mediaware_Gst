var express = require('express'),
  app = express(),
  
  port = process.env.PORT || 3000;
app.get('/params', function(req,res) {  
	var sql = require("mssql");
  var config = {
 user: 'sa',
 password: '1234',
 server: 'AVINASHP', 
 database: 'GST' 
 };
sql.close();
 var HSNSACCODE=req.query.HSNSACCODE;
 var TAXAMOUNT=req.query.TAXAMOUNT;
 var SSTCODE=req.query.SSTCODE;
 var BSTCCODE=req.query.BSTCCODE;
 var POSSTCODE=req.query.POSSTCODE; 
console.log(HSNSACCODE);
 sql.connect(config).then(function() {
new sql.Request()
       .input('HSNSACCode', sql.VarChar(50), HSNSACCODE)
       .input('TaxAmount', sql.VarChar(50), TAXAMOUNT)
       .input('SStateCode', sql.VarChar(50), SSTCODE)
       .input('BStateCode', sql.VarChar(50), BSTCCODE)
       .input('POSStateCode', sql.VarChar(50), POSSTCODE)
     
       .execute('GST_Caluclation').then(function(result) {
           console.dir(result);
           sql.close();
           res.send(result.recordset) ;

       }).catch(function(err) {
           console.dir(err);
       });
   });
    
});
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);



	