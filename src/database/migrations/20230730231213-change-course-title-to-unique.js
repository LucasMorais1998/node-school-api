module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'courses',
      'title',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    );
  },

  down: async () => {},
};
