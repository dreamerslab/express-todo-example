var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var Todo = new Schema({
    userId: String
  , content: String
  , updatedAt: Date
});

mongoose.model('Todo', Todo);

mongoose.connect('mongodb://localhost/express-todo');