module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('courses', 'students_id', 'student_id');
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn('courses', 'student_id', 'students_id');
  },
};
