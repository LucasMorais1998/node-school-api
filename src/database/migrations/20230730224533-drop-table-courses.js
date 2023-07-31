module.exports = {
  up: async (queryInterface) => {
    await queryInterface.dropTable('courses');
  },

  down: async () => {},
};
