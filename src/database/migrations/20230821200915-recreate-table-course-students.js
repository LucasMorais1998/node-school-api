module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('course_students', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'courses',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'students',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('course_students');
  },
};
