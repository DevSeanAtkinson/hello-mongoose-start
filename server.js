var express = require('express'),
    logger  = require('morgan')('dev'),
    path    = require('path'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bodyParser = require('body-parser'),
    server  = express();

mongoose.connect('mongodb://localhost/todoApp')
var port = 8080;

var todoSchema = new Schema ({
  desc: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
});

var Todo = mongoose.model('Todo', todoSchema);

server.use(express.static(path.join(__dirname,'public')));
server.use(logger);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/', function(req, res){
  res.send('this is a starter application, welcome!');
});

server.get('/api/todos', function(req, res){
  Todo.find(function(err, todos){
    if(err) throw err;

    res.json(todos);
  });

});

server.post('/api/todos', function(req,res){
  var desc = req.body.desc;
  var todoObj = {
    desc: desc,
    completed: false
  };
  Todo.create(todoObj, function(err, todo){
    if(err) throw err;

    res.json(todo);
  });
});

server.put('/api/todos/:id', function(req, res){
  var id = req.params.id;
  var desc = req.body.desc;
  var completed = req.body.completed;
  var update = {
    desc: desc,
    completed: completed
  };
  Todo.findOneAndUpdate({_id: id}, update, function(err, todo){
    if(err) throw err;

    res.json(todo);
  });
});

server.delete('/api/todos/:id', function(req, res){
  Todo.findOneAndRemove({_id: req.params.id}, function(err, todo){
    if(err) throw err;
    res.json(todo);
  });

});

server.listen(port, function(){
  console.log('Now listening on port ' + port);4
});

server.post('/api/todos', function(req,res){
  var desc = req.body.desc;
  var completed = req.body.completed;
  var todoObj = {
    desc: desc,
    completed
  };
  Todo.create(todoObj, function(err, todo){
    if(err) throw err;

    res.json(todo);
  });
});

server.put('/api/todos/:id', function(req,res){
 var id = req.params.id;
 var desc = req.body.desc;
 var completed = req.body.completed;
 var update = {
   desc: desc,
   completed: completed
 };
 Todo.findOneAndUpdate({_id: id}, update, {new: true},  function(err, todo){
   if(err) throw err;

   res.json(todo);
 });
});

server.delete('/api/todos/:id', function(req,res){
  var id = req.params.id;
  var desc = req.body.desc;
  var completed = req.body.completed;
  var del = {
    desc: desc,
    completed: completed
  };
  Todo.findOneAndRemove({_id: id}, del, function(err, todo){
    if(err) throw(err);

    res.json(todo);
  });
});
