const mongoose = require('mongoose');
const utils = require('../utils');

const Todo = mongoose.model('Todo');

exports.index = async function (req, res, next) {
  try {
    const userId = req.cookies ? req.cookies.user_id : undefined;
    const todos = await Todo.find({ user_id: userId }).sort('-updated_at').exec();
    res.render('index', {
      title: 'Express Todo Example',
      todos,
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async function (req, res, next) {
  try {
    const newTodo = new Todo({
      user_id: req.cookies ? req.cookies.user_id : undefined,
      content: req.body.content,
      updated_at: Date.now(),
    });
    await newTodo.save();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

exports.destroy = async function (req, res, next) {
  try {
    const todo = await Todo.findById(req.params.id);
    const userId = req.cookies ? req.cookies.user_id : undefined;

    if (todo.user_id !== userId) {
      return utils.forbidden(res);
    }

    await todo.deleteOne();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

exports.edit = async function (req, res, next) {
  try {
    const userId = req.cookies ? req.cookies.user_id : undefined;
    const todos = await Todo.find({ user_id: userId }).sort('-updated_at').exec();
    res.render('edit', {
      title: 'Express Todo Example',
      todos,
      current: req.params.id,
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async function (req, res, next) {
  try {
    const todo = await Todo.findById(req.params.id);
    const userId = req.cookies ? req.cookies.user_id : undefined;

    if (todo.user_id !== userId) {
      return utils.forbidden(res);
    }

    todo.content = req.body.content;
    todo.updated_at = Date.now();
    await todo.save();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

exports.current_user = function (req, res, next) {
  const userId = req.cookies ? req.cookies.user_id : undefined;

  if (!userId) {
    res.cookie('user_id', utils.uid(32));
  }

  next();
};
