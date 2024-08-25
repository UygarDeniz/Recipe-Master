'use client';
import React from 'react';
import FormButton from './FormButton';
import { toast } from 'sonner';
import { deleteRecipe } from '@/actions/recipe/delete-recipe';
import { useRouter } from 'next/navigation';
function DeleteRecipe({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async (formData: FormData) => {
    toast('Are you sure ?', {
      description: 'This action cannot be undone.',
      position: 'bottom-center',
      className: 'flex-col  items-center justify-center text-center mb-5  py-8',

      duration: Infinity,
      actionButtonStyle: {
        backgroundColor: '#ff1a1a',
        width: '100%',
        justifyContent: 'center',
        fontSize: '18px',
        margin: '4px',
      },

      cancelButtonStyle: {
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        margin: '30px 4px 4px 4px',
      },

      action: {
        label: 'Delete',
        onClick: async () => {
          const res = await deleteRecipe(id);

          if (res.success) {
            toast.success('Recipe deleted successfully!', {
              position: 'top-right',
              duration: 3000,
              style: {
                backgroundColor: '#d1fae5',
                color: '#065f46',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                fontSize: '16px',
                fontWeight: '500',
              },
            });
            router.push('/recipes/my-recipes');
          } else {
            toast.error('Failed to delete recipe', {
              position: 'top-right',
              style: {
                backgroundColor: '#fed7d7',
                color: '#9b2c2c',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                fontSize: '16px',
                fontWeight: '500',
              },
            });
          }
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => toast.dismiss(),
      },
    });
  };
  return (
    <form className='flex justify-center w-full' action={handleDelete}>
      <FormButton formName='Delete Recipe' variant='danger' />
    </form>
  );
}

export default DeleteRecipe;
