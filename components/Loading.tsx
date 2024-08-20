import { LoaderCircle } from 'lucide-react';

function Loading() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <LoaderCircle size={42} className='animate-spin' />
    </div>
  );
}

export default Loading;
