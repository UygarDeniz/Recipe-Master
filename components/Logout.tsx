import { signOut } from '@/auth';
import FormButton from './FormButton';
function Logout() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <FormButton variant="primary" formName='Log out' />
    </form>
  );
}

export default Logout;
