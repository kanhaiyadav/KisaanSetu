import express from 'express';
import './config/database.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
