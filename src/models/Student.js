import Sequelize, { Model } from 'sequelize';
import {
  validatePositiveInteger,
  validatePositiveNonNegativeNumber,
  validateString,
  validationMessages,
} from '../utils/validations';

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            isValidString(value) {
              validateString(value, 'Name');
            },
            len: {
              args: [3, 255],
              msg: validationMessages.len('Name', 3, 255),
            },
          },
        },
        last_name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            isValidString(value) {
              validateString(value, 'Last_name');
            },
            len: {
              args: [3, 255],
              msg: validationMessages.len('Last_name', 3, 255),
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: validationMessages.uniqueEmail,
          },
          validate: {
            isEmail: {
              msg: validationMessages.invalidEmail,
            },
          },
        },
        age: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          validate: {
            isValidAge(value) {
              validatePositiveInteger(value, 'Age');
            },
          },
        },
        weight: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
          validate: {
            isValidWeight(value) {
              validatePositiveNonNegativeNumber(value, 'Weight');
            },
          },
        },
        height: {
          type: Sequelize.FLOAT,
          defaultValue: '',
          validate: {
            isValidHeight(value) {
              validatePositiveNonNegativeNumber(value, 'Height');
            },
          },
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Course, {
      foreignKey: 'student_id',
      through: 'course_students',
      as: 'courses',
    });
    this.hasOne(models.Photo, { foreignKey: 'student_id' });
  }
}
