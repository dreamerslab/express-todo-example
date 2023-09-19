const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  user_id: String,
  content: String,
  updated_at: Date
});

mongoose.model('Todo', TodoSchema);

mongoose.connect('mongodb://localhost:36482 /express-todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
