import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`flex items-start gap-4 cursor-pointer group ${className}`}>
      <input
        type="checkbox"
        className="w-7 h-7 rounded border-2 border-gray-300 text-blue-600
                   focus:ring-4 focus:ring-blue-500 focus:ring-offset-2
                   cursor-pointer flex-shrink-0 mt-0.5"
        {...props}
      />
      <span className="text-lg md:text-xl text-gray-900 leading-relaxed group-hover:text-gray-700">
        {label}
      </span>
    </label>
  );
}
