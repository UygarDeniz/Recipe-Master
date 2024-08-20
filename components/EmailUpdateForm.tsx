"use client"
import { updateEmail } from '@/actions/auth/profile-actions';
import FormButton from './FormButton';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

function EmailUpdateForm({ email }: { email: string }) {
  const { update } = useSession();
  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await updateEmail(formData);
      if (response?.message === 'Email updated successfully!') {
        toast.success(response.message);
        update({ email: response.newEmail });
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
          <label htmlFor='email' className='text-sm font-semibold mb-2'>
            Email:
          </label>
          <input
            type='email'
            name='email'
            className='border py-3 px-4 border-gray-300 focus:outline-orange-500 rounded-xl  dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
            defaultValue={email}
          />
        </div>
        <div className='text-center'>
          <FormButton variant='secondary' formName='Update Email' />
        </div>
      </div>
    </form>
  );
}

export default EmailUpdateForm;
