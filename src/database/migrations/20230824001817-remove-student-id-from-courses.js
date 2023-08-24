module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn(
      'courses',
      'student_id',
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('courses', 'student_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'students',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
};
