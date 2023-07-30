module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn('students', 'course');
  },

  down: async () => {},
};
