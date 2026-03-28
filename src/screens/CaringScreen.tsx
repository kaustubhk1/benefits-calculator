import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { OptionButton } from '../components/OptionButton';
import { CaringStatus } from '../types';
import { calculateEligibleBenefits } from '../utils/benefitLogic';

export function CaringScreen() {
  const { answers, updateAnswers, setCurrentScreen, setEligibleBenefits } = useApp();
  const [caringStatus, setCaringStatus] = useState<CaringStatus | null>(
    answers.caringStatus
  );
  const [caringIsPaid, setCaringIsPaid] = useState<'yes' | 'no' | null>(
    answers.caringIsPaid
  );
  const [showError, setShowError] = useState(false);

  const pronoun = answers.mode === 'self' ? 'you' : 'they';

  const needsCaringPaidAnswer =
    caringStatus === 'i-care' || caringStatus === 'someone-cares-for-me';

  const handleContinue = () => {
    if (!caringStatus || (needsCaringPaidAnswer && !caringIsPaid)) {
      setShowError(true);
      return;
    }

    const updatedAnswers = { ...answers, caringStatus, caringIsPaid };
    updateAnswers({ caringStatus, caringIsPaid });

    const benefits = calculateEligibleBenefits(updatedAnswers);
    setEligibleBenefits(benefits);
    setCurrentScreen('results');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <ProgressBar current={6} total={6} />

        {showError && (!caringStatus || (needsCaringPaidAnswer && !caringIsPaid)) && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-lg text-red-800">Please answer all questions to continue</p>
          </div>
        )}

        <QuestionCard
          title="Caring responsibilities"
          helpText="This section is about unpaid care (looking after family or friends), not paid professional care."
        >
          <div className="space-y-8">
            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-4">
                Do {pronoun} or someone else spend 20 or more hours a week looking after another
                adult or child with a disability or illness?
              </label>
              <div className="space-y-3">
                <OptionButton
                  selected={caringStatus === 'i-care'}
                  onClick={() => setCaringStatus('i-care')}
                >
                  {answers.mode === 'self'
                    ? 'Yes, I look after someone'
                    : 'Yes, they look after someone'}
                </OptionButton>
                <OptionButton
                  selected={caringStatus === 'someone-cares-for-me'}
                  onClick={() => setCaringStatus('someone-cares-for-me')}
                >
                  {answers.mode === 'self'
                    ? 'Yes, someone looks after me'
                    : 'Yes, someone looks after them'}
                </OptionButton>
                <OptionButton
                  selected={caringStatus === 'no'}
                  onClick={() => {
                    setCaringStatus('no');
                    setCaringIsPaid(null);
                  }}
                >
                  No
                </OptionButton>
              </div>
            </div>

            {needsCaringPaidAnswer && (
              <div>
                <label className="block text-xl font-semibold text-gray-900 mb-4">
                  Is this mostly unpaid care from family or friends?
                </label>
                <div className="space-y-3">
                  <OptionButton
                    selected={caringIsPaid === 'no'}
                    onClick={() => setCaringIsPaid('no')}
                  >
                    Yes, mostly unpaid
                  </OptionButton>
                  <OptionButton
                    selected={caringIsPaid === 'yes'}
                    onClick={() => setCaringIsPaid('yes')}
                  >
                    No, it is paid care
                  </OptionButton>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              variant="secondary"
              onClick={() => setCurrentScreen('health')}
              className="w-full md:w-auto"
            >
              Back
            </Button>
            <Button onClick={handleContinue} className="flex-1">
              See Results
            </Button>
          </div>
        </QuestionCard>
      </div>
    </div>
  );
}
