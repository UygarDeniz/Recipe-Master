import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-orange-600 text-white hover:bg-orange-700  dark:bg-orange-500 dark:text-white dark:hover:bg-orange-600 ',
        secondary:
          'bg-[#3A3A3A] text-white hover:bg-gray-600 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-300',
        danger:
          'bg-red-500 text-white hover:bg-red-700  dark:bg-red-500 dark:text-gray-200 dark:hover:bg-red-600 ',
      },
      size: {
        small: 'px-3 py-2 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
      },
      rounded: {
        none: 'rounded-none',
        small: 'rounded-sm',
        medium: 'rounded-md',
        large: 'rounded-lg',
        full: 'rounded-full',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      rounded: 'medium',
    },
  }
);

function Button({
  variant,
  size,
  rounded,
  disabled,
  className,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      {...props}
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      disabled={disabled}
    />
  );
}
Button.displayName = 'Button';

export default Button;
