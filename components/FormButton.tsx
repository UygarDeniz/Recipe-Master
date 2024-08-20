'use client';
import Button from './Button';
import { LoaderCircle } from 'lucide-react';
import { useFormStatus } from 'react-dom';
function RegisterButton({ formName , variant}: { formName: string, variant: "primary" | "secondary" | "danger"}) {
  const { pending } = useFormStatus();
  return (
    <Button variant={variant} disabled={pending}>
      {pending ? (
        <LoaderCircle
          className='h-6 w-[4rem] animate-spin'
          aria-label='Loading'
        />
      ) : (
        formName
      )}
    </Button>
  );
}

export default RegisterButton;
