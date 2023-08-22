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
}
