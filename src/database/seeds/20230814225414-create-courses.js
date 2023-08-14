module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'courses',
      [
        {
          title: 'Computer Science',
          description: 'Computer Science is the study of algorithms, programming, and computer systems. The curriculum covers coding, data structures, software design, and computational theory. Students learn to develop software solutions and understand the foundations of technology.',
          duration: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Medicine',
          description: 'Medicine involves studying human health, diagnosing illnesses, and providing medical care. The curriculum includes anatomy, physiology, pharmacology, ethics, and clinical practices. Medical students learn disease diagnosis and treatment.',
          duration: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Pharmacy',
          description: 'Pharmacy is the study of medication, drug interactions, and patient care. The program covers pharmaceutical sciences, drug formulation, dosage, and dispensing. Students learn about the effects and uses of medicines.',
          duration: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async () => {},
};
