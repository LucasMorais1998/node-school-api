import Sequelize, { Model } from 'sequelize';

export default class Course extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'O curso já está cadastrado no sistema.',
          },
          validate: {
            len: {
              args: [4, 60],
              msg: 'O nome do curso precisa ter entre 4 e 60 caracteres.',
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
              msg: 'A duração do curso precisa ser um número inteiro.',
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
