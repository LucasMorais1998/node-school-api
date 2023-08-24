import { Model } from 'sequelize';

export default class CourseStudents extends Model {
  static init(sequelize) {
    super.init(
      {
      },
      {
        sequelize,
        tableName: 'course_students',
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student',
    });

    this.belongsTo(models.Course, {
      foreignKey: 'course_id',
      as: 'course',
    });
  }
}
