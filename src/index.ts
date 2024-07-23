import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import httpStatus from 'http-status';
import express, { Express } from 'express';
import { corsOptions } from './utils/corsOptionsUtils';

dotenv.config();
const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.set('trust proxy', 1);
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api-gateway', router);

app.listen(PORT, () => {
  console.log(`GATEWAY IS RUNNING ON PORT ${PORT}`);
});

app.get('**', (req, res) => {
  res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'WELCOME TO OUR APIs GATEWAY.' });
});

export default app;
