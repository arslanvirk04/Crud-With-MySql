     const express = require ("express");
     const bodyParser =require("body-parser");
     const mysqlConnection = require("./connection");
     const peopleRoutes =require("./routes/people");

     var app = express();
     app.use(bodyParser.json());

     app.use("/people" ,peopleRoutes);

          app.listen(3000 , ()=>console.log('express server is running at port no :3000'))

          //get all books
     app.get('/book_record', (req, res) =>
     {
          mysqlConnection.query ('SELECT * FROM books' ,  (err, rows, fields)=>
     {
          if(!err)
               res.send(rows);
          else
               console.log(err);
     })
          
     } );

     //get book by id
     app.get('/book_record/:id', (req, res) =>
     {
          mysqlConnection.query('SELECT * FROM books WHERE book_id =?',[req.params.id],(err, rows, fields)=>
     {
          if(!err)
               res.send(rows)
          else
               console.log(err);
     })
          
     } );

     //delete by id
     app.delete('/book_record /:id', (req, res) =>
     {
          mysqlConnection.query ('DELETE FROM  books WHERE book_id = ?' ,[req.params.id] , (err, rows, fields)=>
     {
          if(!err)
               res.send('DELETE SUCCESSFULLY')
          else
               console.log(err);
     })
          
     } ); 

     //Insert books
     app.post('/book_record', (req, res) =>
     {
          var sql = "SET @book_id =? ; SET @book_name =? ;SET @author_name =? ; SET @published_date =? ; SET @book_status =? ;\
          CALL book_recordAddOrEdit(@book_id @book_name @author_name@published_date@book_status );"
          mysqlConnection.query (sql ,  [book.book_id, book.book_name , book.author_name, book.published_date, book.book_status],(err, rows, fields)=>
     {
          if(!err)
                    rows.forEach(element => {
                         if (element.constructor == Array)
                         res.send('inserted book id :'+ element[0].book_id )
                         
                    });
          else
               console.log(err);
     })
          
     } ); 

     //update books
     app.put('/book_record', (req, res) =>
     {
          let emp = req.body;
          var sql = "SET @book_id =? ; SET @book_name =? ;SET @author_name =? ; SET @published_date =? ; SET @book_status =? ;\
          CALL book_recordAddOrEdit(@book_id @book_name @author_name@published_date@book_status );"
          mysqlConnection.query (sql ,  [book.book_id, book.book_name , book.author_name, book.published_date, book.book_status],(err, rows, fields)=>
     {
          if(!err)
          {
                         res.send('updated successfully')
                         
                    }
          else
          {
               console.log(err);
     }
     });

          
     } );