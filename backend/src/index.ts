import 'reflect-metadata';

import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { AppConfig } from './utils/config';
import './db/prisma';
import { logger } from './utils/log';

import { notFoundMiddleware } from './middlewares/not-found.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes';


const start = async (): Promise<void> => {
  const app = express();

  app.use(cors({
    origin: '*',
  }));
  app.use('/public', express.static('public'));

  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(
    AppConfig.NODE_ENV === 'development'
      ? 'dev'
      : 'combined'
  ));

  app.use('/api/v1', routes());

  app.use(notFoundMiddleware);
  app.use(errorMiddleware)

  app.listen(AppConfig.PORT, () => {
    logger.info('Server is running on port 5000');
  });
  app.on('error', (err) => {
    logger.error(err);
  });
};

start().then(async () => {
  
});