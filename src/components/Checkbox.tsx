import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ label, checked, onChange, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`flex items-start gap-6 p-6 md:p-8 rounded-2xl border-2 cursor-pointer transition-all duration-200 shadow-sm hover:-translate-y-0.5 ${checked ? 'border-accessible-primary bg-indigo-50 shadow-md ring-1 ring-accessible-primary' : 'border-accessible-border bg-white hover:border-indigo-400 hover:bg-slate-50'} ${className}`}>
      <input
        type="checkbox"
        className="w-8 h-8 rounded border-2 border-accessible-border text-accessible-primary focus:ring-4 focus:ring-accessible-primary focus:ring-offset-2 cursor-pointer flex-shrink-0 mt-1"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        {...props}
      />
      <span className="text-xl md:text-2xl font-bold text-accessible-900 leading-relaxed group-hover:text-accessible-hover">
        {label}
      </span>
    </label>
  );
}
