import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { OptionButton } from '../components/OptionButton';
import { AgeBand, Country, LivingSituation } from '../types';

export function AboutYouScreen() {
  const { answers, updateAnswers, setCurrentScreen } = useApp();
  const [ageBand, setAgeBand] = useState<AgeBand | null>(answers.ageBand);
  const [country, setCountry] = useState<Country | null>(answers.country);
  const [livingSituation, setLivingSituation] = useState<LivingSituation | null>(
    answers.livingSituation
  );
  const [showError, setShowError] = useState(false);

  const pronoun = answers.mode === 'self' ? 'you' : 'they';
  const possessive = answers.mode === 'self' ? 'your' : 'their';

  const handleContinue = () => {
    if (!ageBand || !country || !livingSituation) {
      setShowError(true);
      return;
    }

    updateAnswers({ ageBand, country, livingSituation });
    setCurrentScreen('income');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <ProgressBar current={1} total={6} />

        {showError && !ageBand && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-lg text-red-800">Please answer all questions to continue</p>
          </div>
        )}

        <QuestionCard
          title="About you"
          helpText={`We need some basic information to work out what ${pronoun} might be entitled to.`}
        >
          <div className="space-y-8">
            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-4">
                Age band
              </label>
              <div className="space-y-3">
                <OptionButton
                  selected={ageBand === '60-64'}
                  onClick={() => setAgeBand('60-64')}
                >
                  60-64 years
                </OptionButton>
                <OptionButton
                  selected={ageBand === '65-74'}
                  onClick={() => setAgeBand('65-74')}
                >
                  65-74 years
                </OptionButton>
                <OptionButton
                  selected={ageBand === '75-84'}
                  onClick={() => setAgeBand('75-84')}
                >
                  75-84 years
                </OptionButton>
                <OptionButton
                  selected={ageBand === '85+'}
                  onClick={() => setAgeBand('85+')}
                >
                  85 years or older
                </OptionButton>
              </div>
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-4">
                Which country do {pronoun} live in?
              </label>
              <div className="space-y-3">
                <OptionButton
                  selected={country === 'England'}
                  onClick={() => setCountry('England')}
                >
                  England
                </OptionButton>
                <OptionButton
                  selected={country === 'Scotland'}
                  onClick={() => setCountry('Scotland')}
                >
                  Scotland
                </OptionButton>
                <OptionButton
                  selected={country === 'Wales'}
                  onClick={() => setCountry('Wales')}
                >
                  Wales
                </OptionButton>
                <OptionButton
                  selected={country === 'Northern Ireland'}
                  onClick={() => setCountry('Northern Ireland')}
                >
                  Northern Ireland
                </OptionButton>
              </div>
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-4">
                What is {possessive} living situation?
              </label>
              <div className="space-y-3">
                <OptionButton
                  selected={livingSituation === 'alone'}
                  onClick={() => setLivingSituation('alone')}
                >
                  Live alone
                </OptionButton>
                <OptionButton
                  selected={livingSituation === 'with-partner'}
                  onClick={() => setLivingSituation('with-partner')}
                >
                  Live with partner
                </OptionButton>
                <OptionButton
                  selected={livingSituation === 'with-family'}
                  onClick={() => setLivingSituation('with-family')}
                >
                  Live with family
                </OptionButton>
                <OptionButton
                  selected={livingSituation === 'sheltered-housing'}
                  onClick={() => setLivingSituation('sheltered-housing')}
                >
                  Live in sheltered or supported housing
                </OptionButton>
                <OptionButton
                  selected={livingSituation === 'care-home'}
                  onClick={() => setLivingSituation('care-home')}
                >
                  Live in a care home
                </OptionButton>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              variant="secondary"
              onClick={() => setCurrentScreen('welcome')}
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
