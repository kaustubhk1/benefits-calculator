import { ButtonHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

interface OptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: React.ReactNode;
}

export function OptionButton({
  selected = false,
  children,
  className = '',
  ...props
}: OptionButtonProps) {
  return (
    <button
      className={`
        relative w-full p-5 text-left rounded-xl border-2 transition-all
        focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2
        min-h-[56px] text-lg md:text-xl
        ${
          selected
            ? 'border-blue-600 bg-blue-50 text-gray-900'
            : 'border-gray-300 bg-white text-gray-900 hover:border-blue-400 hover:bg-blue-50'
        }
        ${className}
      `}
      {...props}
    >
      <span className="block pr-10">{children}</span>
      {selected && (
        <Check
          className="absolute right-5 top-1/2 -translate-y-1/2 w-7 h-7 text-blue-600"
          aria-label="Selected"
        />
      )}
    </button>
  );
}
