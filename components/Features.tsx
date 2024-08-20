import Image from 'next/image';
export default function Features() {
  const features = [
    {
      title: 'Explore Recipes',
      description: 'Discover delicious recipes from around the world.',
      icon: '/features1.png',
      animationDelay: 200,
    },
    {
      title: 'Create Your Own',
      description:
        'Share your culinary creations with a community of food lovers.',
      icon: '/features2.png',
      animationDelay: 400,
    },
    {
      title: 'Save Your Favorites',
      description:
        'Keep track of your favorite recipes and access them anytime.',
      icon: '/features3.png',
      animationDelay: 600,
    },
  ];

  return (
    <section className='py-40 px-4 ' data-aos="fade-up" data-aos-delay="400">
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-semibold text-gray-800 dark:text-gray-200'>
          Why Choose Recipe Master?
        </h2>
      </div>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        {features.map((feature) => (
          <div
            key={feature.title}
            className='p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800 flex text-center flex-col items-center justify-center h-96 transition duration-300 hover:shadow-xl'
            data-aos='fade-up'
            data-aos-delay={feature.animationDelay}
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              width={100}
              height={100}
              className='h-24 w-auto mb-8 '
            />
            <h3 className='text-2xl  font-bold text-orange-500 mb-4'>
              {feature.title}
            </h3>
            <p className='text-gray-700 dark:text-gray-300'>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
