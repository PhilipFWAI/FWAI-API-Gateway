import express, { Express, Request, Response } from 'express';
import { rateLimiter } from './utils/rateLimiterUtils';
import { corsOptions } from './utils/corsOptionsUtils';
import httpStatus from 'http-status';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(cors(corsOptions));
app.use(rateLimiter);

app.get('**', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'WELCOME TO OUR GATEWAY.' });
});

app.listen(PORT, () => {
  console.log(`GATEWAY IS RUNNING ON PORT ${PORT}`);
});

export default app;
