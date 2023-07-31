import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Course from '../models/Course';
import Student from '../models/Student';
import User from '../models/User';

const models = [Student, User, Course];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
