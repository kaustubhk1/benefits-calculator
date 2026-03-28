import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { OptionButton } from '../components/OptionButton';
import { Checkbox } from '../components/Checkbox';
import { DisabilityLevel, DailyHelpNeeds } from '../types';

export function HealthScreen() {
  const { answers, updateAnswers, setCurrentScreen } = useApp();
  const [hasDisability, setHasDisability] = useState<DisabilityLevel | null>(
    answers.hasDisability
  );
  const [dailyHelpNeeds, setDailyHelpNeeds] = useState<DailyHelpNeeds>(
    answers.dailyHelpNeeds
  );
  const [hadFall, setHadFall] = useState<'yes' | 'no' | 'prefer-not-say' | null>(
    answers.hadFall
  );
  const [showError, setShowError] = useState(false);

  const pronoun = answers.mode === 'self' ? 'you' : 'they';

  const handleHelpNeedChange = (need: keyof DailyHelpNeeds) => {
    setDailyHelpNeeds(prev => ({
      ...prev,
      [need]: !prev[need],
      ...(need === 'none' && !prev.none ? {
        washing: false,
        dressing: false,
        bedChair: false,
        toilet: false,
        movingIndoors: false,
        cooking: false,
        medicines: false,
      } : {}),
      ...(need !== 'none' && prev.none ? { none: false } : {}),
    }));
  };

  const handleContinue = () => {
    if (!hasDisability || !hadFall) {
      setShowError(true);
      return;
    }

    updateAnswers({ hasDisability, dailyHelpNeeds, hadFall });
    setCurrentScreen('caring');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <ProgressBar current={5} total={6} />

        {showError && (!hasDisability || !hadFall) && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-lg text-red-800">Please answer all questions to continue</p>
          </div>
        )}

        <QuestionCard title="Health and disability">
          <div className="space-y-8">
            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-4">
                Do {pronoun} have a long-term illness or disability that makes daily life harder?
              </label>
              <div className="space-y-3">
                <OptionButton
                  selected={hasDisability === 'yes-lot'}
                  onClick={() => setHasDisability('yes-lot')}
                >
                  Yes, a lot
                </OptionButton>
                <OptionButton
                  selected={hasDisability === 'yes-little'}
                  onClick={() => setHasDisability('yes-little')}
                >
                  Yes, a little
                </OptionButton>
                <OptionButton
                  selected={hasDisability === 'no'}
                  onClick={() => setHasDisability('no')}
                >
                  No
                </OptionButton>
              </div>
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-4">
                Do {pronoun} need help with any of these most days? (Select all that apply)
              </label>
              <div className="space-y-4">
                <Checkbox
                  label="Washing or bathing"
                  checked={dailyHelpNeeds.washing}
                  onChange={() => handleHelpNeedChange('washing')}
                />
                <Checkbox
                  label="Getting dressed"
                  checked={dailyHelpNeeds.dressing}
                  onChange={() => handleHelpNeedChange('dressing')}
                />
                <Checkbox
                  label="Getting in and out of bed or a chair"
                  checked={dailyHelpNeeds.bedChair}
                  onChange={() => handleHelpNeedChange('bedChair')}
                />
                <Checkbox
                  label="Going to the toilet"
                  checked={dailyHelpNeeds.toilet}
                  onChange={() => handleHelpNeedChange('toilet')}
                />
                <Checkbox
                  label="Moving around indoors"
                  checked={dailyHelpNeeds.movingIndoors}
                  onChange={() => handleHelpNeedChange('movingIndoors')}
                />
                <Checkbox
                  label="Cooking or eating"
                  checked={dailyHelpNeeds.cooking}
                  onChange={() => handleHelpNeedChange('cooking')}
                />
                <Checkbox
                  label="Managing medicines"
                  checked={dailyHelpNeeds.medicines}
                  onChange={() => handleHelpNeedChange('medicines')}
                />
                <Checkbox
                  label="None of these"
                  checked={dailyHelpNeeds.none}
                  onChange={() => handleHelpNeedChange('none')}
                />
              </div>
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-4">
                Have {pronoun} had a fall in the last year?
              </label>
              <div className="space-y-3">
                <OptionButton
                  selected={hadFall === 'yes'}
                  onClick={() => setHadFall('yes')}
                >
                  Yes
                </OptionButton>
                <OptionButton
                  selected={hadFall === 'no'}
                  onClick={() => setHadFall('no')}
                >
                  No
                </OptionButton>
                <OptionButton
                  selected={hadFall === 'prefer-not-say'}
                  onClick={() => setHadFall('prefer-not-say')}
                >
                  Prefer not to say
                </OptionButton>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              variant="secondary"
              onClick={() => setCurrentScreen('housing')}
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
