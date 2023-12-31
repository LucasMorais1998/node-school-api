import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Course from '../models/Course';
import CourseStudents from '../models/CourseStudents';
import Photo from '../models/Photo';
import Student from '../models/Student';
import User from '../models/User';

const models = [Student, User, Course, Photo, CourseStudents];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);
