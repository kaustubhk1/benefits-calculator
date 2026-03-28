import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { OptionButton } from '../components/OptionButton';
import { HousingType } from '../types';

export function HousingScreen() {
  const { answers, updateAnswers, setCurrentScreen } = useApp();
  const [housingType, setHousingType] = useState<HousingType | null>(answers.housingType);
  const [paysCouncilTax, setPaysCouncilTax] = useState<'yes' | 'no' | 'not-sure' | null>(
    answers.paysCouncilTax
  );
  const [showError, setShowError] = useState(false);

  const pronoun = answers.mode === 'self' ? 'you' : 'they';
  const possessive = answers.mode === 'self' ? 'your' : 'their';

  const handleContinue = () => {
    if (!housingType || !paysCouncilTax) {
      setShowError(true);
      return;
    }

    updateAnswers({ housingType, paysCouncilTax });
    setCurrentScreen('health');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <ProgressBar current={4} total={6} />

        {showError && (!housingType || !paysCouncilTax) && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-lg text-red-800">Please answer all questions to continue</p>
          </div>
        )}

        <QuestionCard title="Housing situation">
          <div className="space-y-8">
            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-4">
                How is {possessive} home arranged?
              </label>
              <div className="space-y-3">
                <OptionButton
                  selected={housingType === 'own-no-mortgage'}
                  onClick={() => setHousingType('own-no-mortgage')}
                >
                  Own home (no mortgage)
                </OptionButton>
                <OptionButton
                  selected={housingType === 'own-with-mortgage'}
                  onClick={() => setHousingType('own-with-mortgage')}
                >
                  Own home (with mortgage)
                </OptionButton>
                <OptionButton
                  selected={housingType === 'rent-council'}
                  onClick={() => setHousingType('rent-council')}
                >
                  Rent from council or housing association
                </OptionButton>
                <OptionButton
                  selected={housingType === 'rent-private'}
                  onClick={() => setHousingType('rent-private')}
                >
                  Rent from private landlord
                </OptionButton>
                <OptionButton
                  selected={housingType === 'other'}
                  onClick={() => setHousingType('other')}
                >
                  Other arrangement
                </OptionButton>
              </div>
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-4">
                Do {pronoun} pay Council Tax for this home?
              </label>
              <div className="space-y-3">
                <OptionButton
                  selected={paysCouncilTax === 'yes'}
                  onClick={() => setPaysCouncilTax('yes')}
                >
                  Yes
                </OptionButton>
                <OptionButton
                  selected={paysCouncilTax === 'no'}
                  onClick={() => setPaysCouncilTax('no')}
                >
                  No / fully exempt
                </OptionButton>
                <OptionButton
                  selected={paysCouncilTax === 'not-sure'}
                  onClick={() => setPaysCouncilTax('not-sure')}
                >
                  Not sure
                </OptionButton>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              variant="secondary"
              onClick={() => setCurrentScreen('savings')}
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
