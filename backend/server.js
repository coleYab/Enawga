import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', () => {
  console.log('Hello express');
});

app.listen(port, () => {
  console.log('Server running at port: port');
});
