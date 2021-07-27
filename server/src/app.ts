import express from 'express';
import dotenv from 'dotenv';
import loader from './loaders';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

loader(app);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
