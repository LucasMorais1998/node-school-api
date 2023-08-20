import Sequelize, { Model } from 'sequelize';

export default class Course extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'The course is already registered in the system.',
          },
          validate: {
            len: {
              args: [4, 60],
              msg: 'The course title must have between 4 and 60 characters.',
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
            isInt: {
              msg: 'The course duration needs to be an integer number.',
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
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
  }
}
