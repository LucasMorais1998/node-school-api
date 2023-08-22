module.exports = {
  up: async (queryInterface) => {
    await queryInterface.dropTable('course_students');
  },

  down: async () => {},
};
