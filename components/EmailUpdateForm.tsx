import FormButton from './FormButton';

function EmailUpdateForm({ email }: { email: string }) {
  return (
    <form className='mb-6 py-8 px-16'>
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-col'>
          <label htmlFor='email' className='text-sm font-semibold mb-2'>
            Email:
          </label>
          <input
            type='email'
            name='email'
            className='border py-3 px-4 border-gray-300 focus:outline-orange-500 rounded-xl'
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
