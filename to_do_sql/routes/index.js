var express = require('express');
var router = express.Router();
//Import mysql. We got this from npm.
const mysql = require('mysql');
const db_creds = require('../config/config.js');
//Set up a connection to use and reuse...
const connection = mysql.createConnection(db_creds);

//We made a connection above, now actually run it.
connection.connect();
//Now we can start writing queries

/* GET home page. */
router.get('/', function(req, res, next) {
	//get the msg var out of the query string
	let message = req.query.msg;
	if(message === 'added'){
		message = 'Your task was added!';
		console.log('message was changed')
	}if(message === 'deleted'){
		message = 'Your task was deleted!'
	}if(message === 'edit'){
		message = 'Your task has been updated.'
	}

	const selectQuery = 'SELECT * FROM tasks';

	connection.query(selectQuery, (error, results)=>{
		if(error){throw error;}

	
  res.render('index', { message,
  						title: 'Express',
  						taskArray: results,
  						 });
  });
});

router.post('/addItem', (req, res, next)=>{
	const taskName = req.body.newTask;
	const taskDate = req.body.newTaskDate;
	//req.query is for get requests or query strings
	//req.body is for data passed in via post
	//res...
	//1. send
	//2. render
	//3. json

	//we know that someone submitted the form. We know that bc they are at 
	//the post, addItem route. 
	//We got the data the form sent out of the req.body object and stored it
	//Now we need to put it into our DB (mysql)
	const insertQuery = 'INSERT into tasks (task_name, task_date) VALUES(?,?)';
	//query args:
	//1. Query string
	//2. array corresponding to ? in query
	//3. callback to run when query is finished
	console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ Ready to run the query $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');

	connection.query(insertQuery, [taskName, taskDate], (error, results)=>{
		if(error){
			throw error;
		}else{
			console.log('==============query did not error<sending to the homepage==============')
			res.redirect('/?msg=added');
		}
	})
	// res.json(req.query);

});

router.get('/delete/:id', (req, res)=>{
	const idToDelete = req.params.id;
	const deleteQuery = 'DELETE FROM tasks WHERE id = ?';
	connection.query(deleteQuery, [idToDelete], (error, results)=>{
		if(error){throw error;}
		res.redirect('/?msg=deleted');
	})
})

router.get('/edit/:id', (req, res)=>{
	const idToEdit = req.params.id;
		const selectQuery = 'SELECT * FROM tasks WHERE id = ?';

	connection.query(selectQuery, [idToEdit], (error, results)=>{
		if(error){throw error;}
	res.render('edit', {taskArray: results[0],
						idToEdit});
	
	})
})

router.post('/update/:id', (req, res, next)=>{
	const taskName = req.body.newTask;
	const taskDate = req.body.newTaskDate;
	const idToEdit = req.params.id;
	const updateQuery = 'UPDATE tasks SET task_name = ?, task_date = ? WHERE id = ?';
	connection.query(updateQuery, [taskName, taskDate, idToEdit], (error, results)=>{
		if(error){throw error;}
		res.redirect('/?msg=edit');
	})
});


module.exports = router;
