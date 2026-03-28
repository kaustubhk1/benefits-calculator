import { CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { Benefit } from '../types';

export function ResultsScreen() {
  const { eligibleBenefits, setCurrentScreen, resetAnswers } = useApp();

  const getConfidenceIcon = (confidence: Benefit['confidence']) => {
    switch (confidence) {
      case 'very-likely':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'worth-checking':
        return <AlertCircle className="w-8 h-8 text-amber-600" />;
      case 'ask-adviser':
        return <HelpCircle className="w-8 h-8 text-gray-600" />;
    }
  };

  const getConfidenceBadge = (confidence: Benefit['confidence']) => {
    switch (confidence) {
      case 'very-likely':
        return (
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-base font-semibold">
            Very likely for you
          </span>
        );
      case 'worth-checking':
        return (
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-base font-semibold">
            Worth checking
          </span>
        );
      case 'ask-adviser':
        return (
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full text-base font-semibold">
            Ask an adviser
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What you might be entitled to
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Based on what you told us, you may be able to get extra help with money, bills, or care.
          </p>
        </div>

        {eligibleBenefits.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 mb-6 text-center">
            <p className="text-xl text-gray-700 mb-6">
              We could not find any additional benefits based on the information you provided.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              However, we recommend speaking to Citizens Advice or Age UK for a full benefits check,
              as there may be other support available for your situation.
            </p>
            <Button onClick={() => setCurrentScreen('letter')} className="mx-auto">
              Create a summary letter
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {eligibleBenefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6 md:p-8"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {getConfidenceIcon(benefit.confidence)}
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h2>
                      {getConfidenceBadge(benefit.confidence)}
                    </div>
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
                    {benefit.summary}
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                    <p className="text-base md:text-lg text-gray-800">
                      <strong>Next step:</strong> {benefit.actionHint}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 md:p-8 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What to do next</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                You can create a summary letter to print or email. This will help when you contact
                Citizens Advice, Age UK, your local council, or other support services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => setCurrentScreen('letter')} className="flex-1">
                  Create a letter or summary
                </Button>
                <Button
                  variant="outline"
                  onClick={resetAnswers}
                  className="flex-1"
                >
                  Start again for someone else
                </Button>
              </div>
            </div>
          </>
        )}

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-5">
          <p className="text-base md:text-lg text-gray-800 leading-relaxed">
            <strong>Important:</strong> This tool gives you an idea of what you might be entitled to.
            It is not a guarantee. For accurate advice and help with applications, please contact
            Citizens Advice, Age UK, or your local council.
          </p>
        </div>
      </div>
    </div>
  );
}
