import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'name needs to have between 3 and 255 characters.',
            },
          },
        },
        last_name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'last_name needs to have between 3 and 255 characters.',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'email already exists.',
          },
          validate: {
            isEmail: {
              msg: 'Invalid email.',
            },
          },
        },
        age: {
          type: Sequelize.INTEGER,
          defaultValue: '',
          validate: {
            isInt: {
              msg: 'age needs to be an integer number.',
            },
          },
        },
        weight: {
          type: Sequelize.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              msg: 'weight needs to be an integer or float number.',
            },
          },
        },
        height: {
          type: Sequelize.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              msg: 'height needs to be an integer or float number.',
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
