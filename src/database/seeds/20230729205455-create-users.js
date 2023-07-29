const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'João',
          email: 'joao@email.com',
          password_hash: await bcrypt.hash('password', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Maria',
          email: 'maria@email.com',
          password_hash: await bcrypt.hash('password', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Luiz',
          email: 'Luiz@email.com',
          password_hash: await bcrypt.hash('password', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async () => {},
};
