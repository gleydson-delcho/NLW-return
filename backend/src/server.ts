import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();
const port = process.env.PORT || 3333;

app
  .use(cors({
    origin: 'http://localhost:3000'
  }))
  .use(express.json())
  .use(routes)
  .listen(port, () => {
    console.log(`Server is runing on port: ${port}`);
  })