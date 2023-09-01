/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';
import express from 'express';

import courseRoutes from './routes/courseRoutes';
import courseStudentsRoutes from './routes/courseStudentsRoutes';
import photoRoutes from './routes/photoRoutes';
import studentRoutes from './routes/studentRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/students/', studentRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/courses/', courseRoutes);
    this.app.use('/photos/', photoRoutes);
    this.app.use('/course-students/', courseStudentsRoutes);
    this.app.use('/tokens', authRoutes);
  }
}

export default new App().app;
