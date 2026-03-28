import { useState } from 'react';
import { FileText, Printer, Download, Copy, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';

export function LetterScreen() {
  const { answers, eligibleBenefits, setCurrentScreen } = useApp();
  const [name, setName] = useState('');
  const [recipient, setRecipient] = useState('');
  const [copied, setCopied] = useState(false);

  const pronoun = answers.mode === 'self' ? 'I' : 'They';
  const possessive = answers.mode === 'self' ? 'my' : 'their';
  const object = answers.mode === 'self' ? 'me' : 'them';

  const ageBandText = {
    '60-64': '60-64',
    '65-74': '65-74',
    '75-84': '75-84',
    '85+': '85 or older',
  }[answers.ageBand || '65-74'];

  const livingSituationText = {
    'alone': 'alone',
    'with-partner': 'with a partner',
    'with-family': 'with family',
    'sheltered-housing': 'in sheltered or supported housing',
    'care-home': 'in a care home',
  }[answers.livingSituation || 'alone'];

  const housingTypeText = {
    'own-no-mortgage': 'own home (no mortgage)',
    'own-with-mortgage': 'own home (with mortgage)',
    'rent-council': 'rented from council or housing association',
    'rent-private': 'rented from private landlord',
    'other': 'other housing arrangement',
  }[answers.housingType || 'own-no-mortgage'];

  const incomeBandText = {
    'under-200': 'under £200',
    '200-300': '£200-£300',
    '300-500': '£300-£500',
    'over-500': 'over £500',
  }[answers.incomeBand || 'under-200'];

  const dailyHelp = Object.entries(answers.dailyHelpNeeds)
    .filter(([key, value]) => key !== 'none' && value)
    .map(([key]) => ({
      washing: 'washing and bathing',
      dressing: 'getting dressed',
      bedChair: 'getting in and out of bed or a chair',
      toilet: 'using the toilet',
      movingIndoors: 'moving around indoors',
      cooking: 'cooking and eating',
      medicines: 'managing medicines',
    }[key]))
    .filter(Boolean);

  const letterContent = `${name ? `Name: ${name}\n\n` : ''}Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

${recipient ? `To: ${recipient}\n\n` : ''}${pronoun} would like help to check what benefits and financial support ${pronoun === 'I' ? 'I' : 'they'} might be entitled to.

Based on an online benefits checker (ElderBenefit), ${pronoun === 'I' ? 'I' : 'they'} may be eligible for:

${eligibleBenefits.map(b => `• ${b.title}`).join('\n')}

${possessive.charAt(0).toUpperCase() + possessive.slice(1)} situation in brief:

• Age band: ${ageBandText}
• Living situation: ${pronoun} live${pronoun === 'I' ? '' : 's'} ${livingSituationText}
• Housing: ${housingTypeText}${answers.paysCouncilTax === 'yes' ? ', and pay Council Tax' : ''}
• Income: roughly ${incomeBandText} per week from all sources
${answers.hasDisability && answers.hasDisability !== 'no' ? `• ${pronoun} ${pronoun === 'I' ? 'have' : 'has'} long-term health problems or disability` : ''}${dailyHelp.length > 0 ? `\n• ${pronoun} need${pronoun === 'I' ? '' : 's'} help with daily tasks such as: ${dailyHelp.join(', ')}` : ''}

Please could you help ${object} confirm what ${pronoun === 'I' ? 'I' : 'they'} can claim and how to apply?

Thank you.`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => setCurrentScreen('results')}
            size="medium"
          >
            Back to Results
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 md:p-10 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Your summary letter
            </h1>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Your name (optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg
                         focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Who is this letter for?
              </label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg
                         focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-600"
              >
                <option value="">Select recipient</option>
                <option value="My local council">My local council</option>
                <option value="Citizens Advice">Citizens Advice</option>
                <option value="Age UK">Age UK</option>
                <option value="Department for Work and Pensions">Department for Work and Pensions</option>
                <option value="My GP or support worker">My GP or support worker</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-6 print-section">
            <pre className="whitespace-pre-wrap font-sans text-base md:text-lg text-gray-900 leading-relaxed">
              {letterContent}
            </pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={handlePrint} variant="primary">
              <Printer className="w-6 h-6 mr-2 inline" />
              Print
            </Button>
            <Button onClick={handleCopy} variant="secondary">
              {copied ? (
                <>
                  <Check className="w-6 h-6 mr-2 inline" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-6 h-6 mr-2 inline" />
                  Copy text
                </>
              )}
            </Button>
            <Button onClick={() => window.print()} variant="outline">
              <Download className="w-6 h-6 mr-2 inline" />
              Save as PDF
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
          <p className="text-base md:text-lg text-gray-800 leading-relaxed">
            <strong>Tip:</strong> You can print this letter and take it to your appointment,
            or copy the text to email it to the organization you need help from.
          </p>
        </div>
      </div>
    </div>
  );
}
