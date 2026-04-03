import { ButtonHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

interface OptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
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
        relative w-full p-6 md:p-8 rounded-2xl border-2 transition-all duration-200 text-left mb-4 shadow-sm min-h-[72px] text-xl md:text-2xl font-bold
        focus:outline-none focus:ring-4 focus:ring-accessible-primary focus:ring-offset-2 hover:-translate-y-0.5
        ${
          selected
            ? 'border-accessible-primary bg-indigo-50 text-accessible-900 shadow-md ring-1 ring-accessible-primary'
            : 'border-accessible-border bg-white text-accessible-900 hover:border-indigo-400 hover:bg-slate-50'
        }
        ${className}
      `}
      {...props}
    >
      <span className="block pr-14 leading-relaxed">{children}</span>
      {selected && (
        <Check
          className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 text-accessible-primary"
          aria-label="Selected"
        />
      )}
    </button>
  );
}
