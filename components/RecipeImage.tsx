import Image from 'next/image';

interface RecipeImageProps {
  title: string;
  src: string;
}

function RecipeImage({ title, src }: RecipeImageProps) {
  return (
    <section className='relative'>
      <Image
        src={src}
        alt={title}
        width={1200}
        height={600}
        className='w-full h-72 object-cover'
      />
      <div className='absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full pb-6 pl-2'>
        <h2 className='text-3xl font-bold text-white'>{title}</h2>
      </div>
    </section>
  );
}

export default RecipeImage;
