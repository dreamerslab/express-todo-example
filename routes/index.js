var mongoose = require('mongoose')
  , Todo = mongoose.model('Todo');

function randomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function uid(len){
  var str    = ''
    , src    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , srcLen = src.length
    , i      = len;

  for(; i-- ;){
    str += src.charAt(randomNumber(0, srcLen - 1));
  }

  return str;
};

exports.index = function(req, res, next){
  Todo.
    find({userId: req.cookies.userid}).
    sort('updatedAt', -1).
    run(function(err, todos, count){
      if (err) return next(err);

      res.render('index', {
          title: 'Express Todo Example'
        , todos: todos
      });
    });
};

exports.create = function(req, res, next){
  new Todo({
      userId: req.cookies.userid
    , content: req.body.content
    , updatedAt: Date.now()
  }).save(function(err, todo, count){
    if (err) return next(err);

    res.redirect('/');
  });
};

exports.destroy = function(req, res, next){
  Todo.findById(req.params.id, function(err, todo){
    if (todo.userId !== req.cookies.userid) return;

    todo.remove(function(err, todo){
      if (err) return next(err);

      res.redirect('/');
    });
  });
};

exports.edit = function(req, res, next){
  Todo.
    find({userId: req.cookies.userid}).
    sort('updatedAt', -1).
    run(function(err, todos){
      if (err) return next(err);

      res.render('edit', {
          title: 'Express Todo Example'
        , todos: todos
        , current: req.params.id
      });
    });
};

exports.update = function(req, res, next){
  Todo.findById(req.params.id, function(err, todo){
    if (todo.userId !== req.cookies.userid) return;

    todo.content = req.body.content;
    todo.updatedAt = Date.now();
    todo.save(function(err, todo, count){
      if (err) return next(err);

      res.redirect('/');
    });
  });
};

exports.currentUser = function(req, res, next){
  if (!req.cookies.userid) {
    res.cookie('userid', uid(32));
  }

  next();
};
