import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { OptionButton } from '../components/OptionButton';
import { Checkbox } from '../components/Checkbox';
import { IncomeBand, CurrentBenefits } from '../types';

export function IncomeScreen() {
  const { answers, updateAnswers, setCurrentScreen } = useApp();
  const [incomeBand, setIncomeBand] = useState<IncomeBand | null>(answers.incomeBand);
  const [currentBenefits, setCurrentBenefits] = useState<CurrentBenefits>(
    answers.currentBenefits
  );
  const [showError, setShowError] = useState(false);

  const pronoun = answers.mode === 'self' ? 'you' : 'they';

  const handleBenefitChange = (benefit: keyof CurrentBenefits) => {
    setCurrentBenefits(prev => ({
      ...prev,
      [benefit]: !prev[benefit],
      ...(benefit === 'dontKnow' && !prev.dontKnow ? {
        statePension: false,
        pensionCredit: false,
        housingBenefit: false,
        councilTaxReduction: false,
        attendanceAllowance: false,
        pip: false,
        carersAllowance: false,
        universalCredit: false,
      } : {}),
      ...(benefit !== 'dontKnow' && prev.dontKnow ? { dontKnow: false } : {}),
    }));
  };

  const handleContinue = () => {
    if (!incomeBand) {
      setShowError(true);
      return;
    }

    updateAnswers({ incomeBand, currentBenefits });
    setCurrentScreen('savings');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <ProgressBar current={2} total={6} />

        {showError && !incomeBand && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-lg text-red-800">Please select an income band to continue</p>
          </div>
        )}

        <QuestionCard
          title="Income overview"
          helpText={`This includes money from pensions, benefits, work, savings interest, and any other sources. We only need a rough figure.`}
        >
          <div className="space-y-8">
            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-4">
                About how much money comes in each week from all sources?
              </label>
              <div className="space-y-3">
                <OptionButton
                  selected={incomeBand === 'under-200'}
                  onClick={() => setIncomeBand('under-200')}
                >
                  Under £200 per week
                </OptionButton>
                <OptionButton
                  selected={incomeBand === '200-300'}
                  onClick={() => setIncomeBand('200-300')}
                >
                  £200-£300 per week
                </OptionButton>
                <OptionButton
                  selected={incomeBand === '300-500'}
                  onClick={() => setIncomeBand('300-500')}
                >
                  £300-£500 per week
                </OptionButton>
                <OptionButton
                  selected={incomeBand === 'over-500'}
                  onClick={() => setIncomeBand('over-500')}
                >
                  Over £500 per week
                </OptionButton>
              </div>
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-4">
                Do {pronoun} receive any of these benefits already? (Select all that apply)
              </label>
              <div className="space-y-4">
                <Checkbox
                  label="State Pension"
                  checked={currentBenefits.statePension}
                  onChange={() => handleBenefitChange('statePension')}
                />
                <Checkbox
                  label="Pension Credit"
                  checked={currentBenefits.pensionCredit}
                  onChange={() => handleBenefitChange('pensionCredit')}
                />
                <Checkbox
                  label="Housing Benefit"
                  checked={currentBenefits.housingBenefit}
                  onChange={() => handleBenefitChange('housingBenefit')}
                />
                <Checkbox
                  label="Council Tax Reduction"
                  checked={currentBenefits.councilTaxReduction}
                  onChange={() => handleBenefitChange('councilTaxReduction')}
                />
                <Checkbox
                  label="Attendance Allowance"
                  checked={currentBenefits.attendanceAllowance}
                  onChange={() => handleBenefitChange('attendanceAllowance')}
                />
                <Checkbox
                  label="Personal Independence Payment (PIP)"
                  checked={currentBenefits.pip}
                  onChange={() => handleBenefitChange('pip')}
                />
                <Checkbox
                  label="Carer's Allowance"
                  checked={currentBenefits.carersAllowance}
                  onChange={() => handleBenefitChange('carersAllowance')}
                />
                <Checkbox
                  label="Universal Credit"
                  checked={currentBenefits.universalCredit}
                  onChange={() => handleBenefitChange('universalCredit')}
                />
                <Checkbox
                  label="Don't know or not sure"
                  checked={currentBenefits.dontKnow}
                  onChange={() => handleBenefitChange('dontKnow')}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              variant="secondary"
              onClick={() => setCurrentScreen('about-you')}
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
