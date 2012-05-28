var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Todo = new Schema({
    userId    : ObjectId
  , content   : String
  , updatedAt : Date
});

mongoose.model('Todo', Todo);

mongoose.connect('mongodb://localhost/express-todo');