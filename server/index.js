import express from 'express';
import 'dotenv/config';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';

import cors from 'cors';

const app = express();
const app2 = express();
// const port = process.env.PORT;
const port = 3001;
const port2 = 3002;

import './db/conn.js';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('SERVER IS RUNNING');
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/task', taskRoutes);

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});


app2.use(cors());
app2.use(express.json());

app2.get('/', (req, res) => {
  res.status(200).send('SERVER IS RUNNING');
});

app2.use('/auth', authRoutes);
app2.use('/user', userRoutes);
app2.use('/task', taskRoutes);

app2.listen(port2, () => {
  console.log(`server started on http://localhost:${port2}`);
});