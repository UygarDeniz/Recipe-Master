import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className='relative h-[80vh] w-full'>
      <div className='relative h-full w-full'>
        <Image
          src='/hero.jpg'
          alt='Delicious food'
          priority
          fill
          className='opacity-80 object-cover'
        />
      </div>
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center text-white'>
        <h1 className='text-5xl font-bold mb-4' data-aos="fade-up" data-aos-delay="100">
          Discover Your Next Favorite Recipe
        </h1>
        <p className='text-xl mb-8' data-aos="fade-up" data-aos-delay="150">
          Explore, create, and share amazing recipes with our community.
        </p>
        <Link
          href='/login'
          className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg'
            data-aos="fade-up" data-aos-delay="200"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
