module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'students',
      [
        {
          name: 'John',
          last_name: 'Doe',
          email: 'john_doe@email.com',
          age: 25,
          weight: 85.6,
          height: 1.87,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Jane',
          last_name: 'Doe',
          email: 'jane_doe@email.com',
          age: 22,
          weight: 58,
          height: 1.57,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async () => {

  },
};
