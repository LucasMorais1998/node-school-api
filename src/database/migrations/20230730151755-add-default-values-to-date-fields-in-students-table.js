module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'students',
      'created_at',
      {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    );

    await queryInterface.changeColumn(
      'students',
      'updated_at',
      {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    );
  },

  down: async () => {},
};
