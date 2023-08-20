module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'photos',
      'student_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
        references: {
          model: 'students',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    );
  },

  down: async () => {},
};
