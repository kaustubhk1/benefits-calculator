import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { OptionButton } from '../components/OptionButton';
import { SavingsBand } from '../types';

export function SavingsScreen() {
  const { answers, updateAnswers, setCurrentScreen } = useApp();
  const [savingsBand, setSavingsBand] = useState<SavingsBand | null>(answers.savingsBand);
  const [showError, setShowError] = useState(false);

  const pronoun = answers.mode === 'self' ? 'you' : 'they';

  const handleContinue = () => {
    if (!savingsBand) {
      setShowError(true);
      return;
    }

    updateAnswers({ savingsBand });
    setCurrentScreen('housing');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <ProgressBar current={3} total={6} />

        {showError && !savingsBand && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-lg text-red-800">Please select an option to continue</p>
          </div>
        )}

        <QuestionCard
          title="Savings and capital"
          helpText={`This includes money in bank accounts, savings accounts, ISAs, and investments. Don't include the value of your home.`}
        >
          <div>
            <label className="block text-xl font-semibold text-gray-900 mb-4">
              Roughly how much do {pronoun} have in savings and investments?
            </label>
            <div className="space-y-3">
              <OptionButton
                selected={savingsBand === 'under-6000'}
                onClick={() => setSavingsBand('under-6000')}
              >
                Under £6,000
              </OptionButton>
              <OptionButton
                selected={savingsBand === '6000-10000'}
                onClick={() => setSavingsBand('6000-10000')}
              >
                £6,000 - £10,000
              </OptionButton>
              <OptionButton
                selected={savingsBand === '10000-16000'}
                onClick={() => setSavingsBand('10000-16000')}
              >
                £10,000 - £16,000
              </OptionButton>
              <OptionButton
                selected={savingsBand === 'over-16000'}
                onClick={() => setSavingsBand('over-16000')}
              >
                Over £16,000
              </OptionButton>
              <OptionButton
                selected={savingsBand === 'prefer-not-say'}
                onClick={() => setSavingsBand('prefer-not-say')}
              >
                Prefer not to say
              </OptionButton>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              variant="secondary"
              onClick={() => setCurrentScreen('income')}
              className="w-full md:w-auto"
            >
              Back
            </Button>
            <Button onClick={handleContinue} className="flex-1">
              Continue
            </Button>
          </div>
        </QuestionCard>
      </div>
    </div>
  );
}
