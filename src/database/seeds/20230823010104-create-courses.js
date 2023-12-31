module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'courses',
      [
        {
          title: 'Business Administration',
          description: 'Business Administration covers management, marketing, finance, and operations. Students learn to lead organizations, analyze markets, and develop strategies for success in the business world.',
          duration: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Civil Engineering',
          description: 'Civil Engineering involves designing, building, and maintaining infrastructure. The curriculum includes structural analysis, transportation engineering, environmental studies, and project management.',
          duration: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Art History',
          description: 'Art History explores the development of visual arts over time. Students study styles, artists, and cultural influences to understand the context and significance of artworks throughout history.',
          duration: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Environmental Science',
          description: 'Environmental Science focuses on the natural world and human impact on the environment. The curriculum covers ecology, conservation, pollution control, and sustainable practices.',
          duration: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Psychology',
          description: 'Psychology involves the study of human behavior and mental processes. Students explore topics such as cognition, emotions, development, and clinical psychology.',
          duration: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Electrical Engineering',
          description: 'Electrical Engineering focuses on designing, developing, and testing electrical systems. The curriculum includes electronics, power generation, signal processing, and communication networks.',
          duration: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Journalism',
          description: 'Journalism covers news reporting, storytelling, and media ethics. Students learn how to research, write, and present news stories through various media platforms.',
          duration: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Mathematics',
          description: 'Mathematics involves the study of abstract structures, numbers, and patterns. The curriculum covers algebra, calculus, geometry, and advanced mathematical theories.',
          duration: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Music Performance',
          description: 'Music Performance focuses on honing musical skills and techniques. Students study music theory, practice instruments, and perform in various settings.',
          duration: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Graphic Design',
          description: 'Graphic Design focuses on visual communication and creating impactful designs. Students learn about typography, layout, color theory, and digital design tools.',
          duration: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Political Science',
          description: 'Political Science explores government structures, policies, and political behavior. Students study political theory, international relations, public policy, and political analysis.',
          duration: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Culinary Arts',
          description: 'Culinary Arts involves cooking techniques, food preparation, and presentation. Students learn about different cuisines, culinary traditions, and kitchen management.',
          duration: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Fashion Design',
          description: 'Fashion Design focuses on clothing and accessory creation. Students learn about fashion trends, garment construction, textiles, and fashion sketching.',
          duration: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Sports Science',
          description: 'Sports Science studies human movement, exercise physiology, and sports performance. Students explore biomechanics, nutrition, and training methods.',
          duration: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Digital Marketing',
          description: 'Digital Marketing focuses on online advertising, social media, and SEO strategies. Students learn how to create effective digital campaigns and reach target audiences.',
          duration: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Film Production',
          description: 'Film Production covers the art of creating movies and videos. Students study scriptwriting, cinematography, editing, and post-production techniques.',
          duration: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Astronomy',
          description: 'Astronomy explores celestial bodies and the universe. Students study stars, planets, galaxies, and cosmological theories.',
          duration: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async () => {},
};
