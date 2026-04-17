'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'ui-button shrink-0 whitespace-nowrap font-normal tracking-[0.02em] disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-45';

    const sizes = {
      sm: 'h-9 px-3.5 text-[0.82rem]',
      md: 'h-11 px-4.5 text-[0.9rem]',
      lg: 'h-12 px-5 text-[0.95rem]',
    };

    return (
      <button
        ref={ref}
        data-size={size}
        data-variant={variant}
        className={cn(baseStyles, sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
