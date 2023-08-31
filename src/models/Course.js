import Sequelize, { Model } from 'sequelize';
import {
  validatePositiveInteger,
  validateString,
  validationMessages,
} from '../utils/validations';

export default class Course extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: validationMessages.uniqueCourse,
          },
          validate: {
            isValidString(value) {
              validateString(value, 'Title');
            },
            len: {
              args: [4, 60],
              msg: validationMessages.len('Title', 4, 60),
            },
          },
        },
        description: {
          type: Sequelize.TEXT,
          defaultValue: '',
        },
        duration: {
          type: Sequelize.INTEGER,
          defaultValue: '',
          validate: {
            isValidDuration(value) {
              validatePositiveInteger(value, 'Duration');
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'courses',
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Student, {
      foreignKey: 'course_id',
      through: 'course_students',
      as: 'students',
    });
  }
}
