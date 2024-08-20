"use client"
import React from 'react';
import FormButton from './FormButton';
import { updatePassword } from '@/actions/auth/profile-actions';
import { toast } from 'sonner';
function UpdatePasswordForm() {
  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await updatePassword(formData);
      if (response?.message === 'Password updated successfully!') {
        toast.success(response.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  }
  return (
    <form className='mb-6 py-8 px-16' action={handleSubmit}>
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-col'>
          <label
            htmlFor='currentPassword'
            className='text-sm font-semibold mb-2'
          >
            Current Password:
          </label>
          <input
            type='password'
            name='currentPassword'
            className='border py-3 px-4 border-gray-300 focus:outline-orange-500 rounded-xl  dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
            required
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password' className='text-sm font-semibold mb-2'>
            New Password:
          </label>
          <input
            type='password'
            name='newPassword'
            className='border py-3 px-4 border-gray-300 focus:outline-orange-500 rounded-xl  dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
            required
          />
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='confirmPassword'
            className='text-sm font-semibold mb-2'
          >
            Confirm Password:
          </label>
          <input
            type='password'
            name='confirmNewPassword'
            className='border py-3 px-4 border-gray-300 focus:outline-orange-500 rounded-xl  dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
            required
          />
        </div>
        <div className='text-center'>
         <FormButton variant= "secondary" formName='Update Password' />
        </div>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
