import Link from 'next/link';

export default async function Home() {
  return (
    <main className='min-h-screen bg-white dark:bg-gray-900'>
      <section className='relative'>
        <img
          src='/hero.jpg'
          alt='Delicious food'
          className='w-full h-[80vh] object-cover opacity-80'
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center text-white'>
          <h1 className='text-5xl font-bold mb-4'>
            Discover Your Next Favorite Recipe
          </h1>
          <p className='text-xl mb-8'>
            Explore, create, and share amazing recipes with our community.
          </p>
          <Link href="/login" className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg'>
            Get Started
          </Link>
        </div>
      </section>

      <section className='flex flex-col justify-center items-center py-4 px-4 text-center h-[60vh]'>
        <h2 className='text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-8'>
          Why Choose Recipe Master?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800'>
            <h3 className='text-2xl font-bold text-orange-500 mb-4'>
              Explore Recipes
            </h3>
            <p className='text-gray-700 dark:text-gray-300'>
              Discover thousands of delicious recipes from around the world.
            </p>
          </div>
          <div className='p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800'>
            <h3 className='text-2xl font-bold text-orange-500 mb-4'>
              Create Your Own
            </h3>
            <p className='text-gray-700 dark:text-gray-300'>
              Share your culinary creations with a community of food lovers.
            </p>
          </div>
          <div className='p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800'>
            <h3 className='text-2xl font-bold text-orange-500 mb-4'>
              Save Your Favorites
            </h3>
            <p className='text-gray-700 dark:text-gray-300'>
              Keep track of your favorite recipes and access them anytime.
            </p>
          </div>
        </div>
      </section>

      <section className='py-8 bg-gray-700 text-center'>
        <h2 className='text-4xl font-semibold text-white mb-4'>
          Join Our Community
        </h2>
        <p className='text-lg text-white mb-8'>
          Sign up today and start your culinary journey!
        </p>
        <button className='bg-white text-orange-500 font-bold py-3 px-8 rounded-full text-lg'>
          Sign Up Now
        </button>
      </section>
    </main>
  );
}
