'use client';
import FormButton from './FormButton';
import { toast } from 'sonner';
import { updateName } from '@/actions/auth/profile-actions';
function NameUpdateForm({ name }: { name: string }) {
  
  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await updateName(formData);
      if (response?.message === 'Name updated successfully!') {
        toast.success(response.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <form className='mb-6 py-8 px-16' action={handleSubmit}>
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-col'>
          <label htmlFor='name' className='text-sm font-semibold mb-2'>
            Name
          </label>
          <input
            type='text'
            name='name'
            required
            className='border py-3 px-4 border-gray-300 focus:outline-orange-500 rounded-xl'
            defaultValue={name}
          />
        </div>
        <div className='text-center'>
          <FormButton variant='secondary' formName='Update Name' />
        </div>
      </div>
    </form>
  );
}

export default NameUpdateForm;
