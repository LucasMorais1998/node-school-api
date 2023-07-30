import Sequelize, { Model } from 'sequelize';

export default class Course extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [4, 60],
              msg: 'O nome do curso precisa ter entre 4 e 60 caracteres.',
            },
          },
        },
        description: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        duration: {
          type: Sequelize.INTEGER,
          defaultValue: '',
          validate: {
            isInt: {
              msg: 'A duração do curso precisa ser um número inteiro.',
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
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
  }
}
