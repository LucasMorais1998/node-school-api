/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import dotenv from 'dotenv';

dotenv.config();

import './src/database';
import express from 'express';

import studentRoutes from './src/routes/studentRoutes';
import userRoutes from './src/routes/userRoutes';
import courseRoutes from './src/routes/courseRoutes';
import photoRoutes from './src/routes/photoRoutes';
import tokenRoutes from './src/routes/tokenRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/students/', studentRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/courses/', courseRoutes);
    this.app.use('/photos/', photoRoutes);
    this.app.use('/tokens', tokenRoutes);
  }
}

export default new App().app;
