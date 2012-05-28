var mongoose = require('mongoose')
  , Todo = mongoose.model('Todo');

exports.index = function(req, res){
  Todo.find(function(err, todos, count){
    res.render('index', {
        title: 'Express Todo Example'
      , todos: todos
    });
  });
};

exports.create = function(req, res){
  new Todo({
    content : req.body.content,
    updatedAt : Date.now()
  }).save(function(err, todo, count){
    res.redirect('/');
  });
};