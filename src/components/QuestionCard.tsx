import { ReactNode } from 'react';
import { HelpCircle } from 'lucide-react';

interface QuestionCardProps {
  title: string;
  helpText?: string;
  children: ReactNode;
}

export function QuestionCard({ title, helpText, children }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        {helpText && (
          <div className="flex items-start gap-2 mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {helpText}
            </p>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
