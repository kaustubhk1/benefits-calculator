import { useState } from 'react';
import { Heart, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { UserMode } from '../types';

export function WelcomeScreen() {
  const { updateAnswers, setCurrentScreen } = useApp();
  const [selectedMode, setSelectedMode] = useState<UserMode | null>(null);
  const [relationship, setRelationship] = useState('');

  const handleContinue = () => {
    if (!selectedMode) return;

    updateAnswers({
      mode: selectedMode,
      ...(selectedMode === 'carer' && relationship ? { relationshipToCarer: relationship } : {}),
    });
    setCurrentScreen('about-you');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ElderBenefit
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Find out what benefits and support you might be entitled to
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 md:p-10 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Who are you checking for?
          </h2>

          <div className="space-y-4 mb-8">
            <button
              onClick={() => setSelectedMode('self')}
              className={`
                w-full p-6 rounded-xl border-2 transition-all text-left
                focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2
                ${
                  selectedMode === 'self'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${selectedMode === 'self' ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <Heart className={`w-8 h-8 ${selectedMode === 'self' ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <span className="text-xl md:text-2xl font-semibold text-gray-900">
                  I am checking for myself
                </span>
              </div>
            </button>

            <button
              onClick={() => setSelectedMode('carer')}
              className={`
                w-full p-6 rounded-xl border-2 transition-all text-left
                focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2
                ${
                  selectedMode === 'carer'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${selectedMode === 'carer' ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <Users className={`w-8 h-8 ${selectedMode === 'carer' ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <span className="text-xl md:text-2xl font-semibold text-gray-900">
                  I am checking for someone I look after
                </span>
              </div>
            </button>
          </div>

          {selectedMode === 'carer' && (
            <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
              <label className="block mb-3">
                <span className="text-lg md:text-xl font-medium text-gray-900 block mb-2">
                  What is your relationship to this person? (Optional)
                </span>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="e.g., Son, Daughter, Friend, Professional carer"
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg
                           focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-600"
                />
              </label>
            </div>
          )}

          <Button
            onClick={handleContinue}
            disabled={!selectedMode}
            className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-5">
          <p className="text-base md:text-lg text-gray-800 leading-relaxed">
            <strong>Please note:</strong> This checker gives you an idea of what you might be entitled to.
            It is not a guarantee. For accurate advice, please speak to Citizens Advice, Age UK, or your local council.
          </p>
        </div>
      </div>
    </div>
  );
}
