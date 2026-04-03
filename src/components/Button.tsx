import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export function Button({
  children,
  variant = 'primary',
  size = 'large',
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'font-bold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 flex items-center justify-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0';

  const variantClasses = {
    primary: 'bg-accessible-primary text-white hover:bg-accessible-hover hover:shadow-md focus:ring-indigo-500',
    secondary: 'bg-white text-accessible-900 border-2 border-accessible-border hover:border-accessible-primary hover:bg-indigo-50 focus:ring-indigo-500',
    outline: 'border-2 border-accessible-primary text-accessible-primary hover:bg-indigo-50 focus:ring-indigo-500',
  };

  const sizeClasses = {
    small: 'px-6 py-3 text-lg min-h-[52px]',
    medium: 'px-8 py-4 text-xl min-h-[60px]',
    large: 'px-10 py-5 text-2xl min-h-[68px]',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
