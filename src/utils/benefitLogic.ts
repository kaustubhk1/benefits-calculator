import { UserAnswers, Benefit } from '../types';

export function calculateEligibleBenefits(answers: UserAnswers): Benefit[] {
  const benefits: Benefit[] = [];

  const isOver65 = answers.ageBand && ['65-74', '75-84', '85+'].includes(answers.ageBand);
  const lowIncome = answers.incomeBand && ['under-200', '200-300'].includes(answers.incomeBand);
  const savingsUnder16k = answers.savingsBand && answers.savingsBand !== 'over-16000' && answers.savingsBand !== 'prefer-not-say';

  if (isOver65 && lowIncome && savingsUnder16k && !answers.currentBenefits.pensionCredit) {
    benefits.push({
      id: 'pension-credit',
      title: 'Pension Credit',
      summary: 'Top-up money if you have reached State Pension age (currently 66) and your income is below a certain level.',
      actionHint: 'You can apply online, by phone, or ask Citizens Advice or Age UK to help you.',
      confidence: 'very-likely',
    });
  }

  const paysCouncilTax = answers.paysCouncilTax === 'yes';
  const onMeansTested = answers.currentBenefits.pensionCredit ||
                        answers.currentBenefits.universalCredit ||
                        lowIncome;

  if (paysCouncilTax && onMeansTested && !answers.currentBenefits.councilTaxReduction) {
    benefits.push({
      id: 'council-tax-reduction',
      title: 'Council Tax Reduction',
      summary: 'Help with paying your Council Tax bill if you are on a low income.',
      actionHint: 'Contact your local council to apply for Council Tax Reduction.',
      confidence: 'very-likely',
    });
  }

  const hasSignificantDisability = answers.hasDisability === 'yes-lot';
  const needsMultipleHelp = Object.entries(answers.dailyHelpNeeds)
    .filter(([key, value]) => key !== 'none' && value).length >= 2;

  if (isOver65 && (hasSignificantDisability || needsMultipleHelp) && !answers.currentBenefits.attendanceAllowance) {
    benefits.push({
      id: 'attendance-allowance',
      title: 'Attendance Allowance',
      summary: 'Money to help with extra costs if you have reached State Pension age and need help with personal care or supervision due to illness or disability.',
      actionHint: 'You can claim Attendance Allowance by phone or post. Age UK or Citizens Advice can help you fill in the form.',
      confidence: 'very-likely',
    });
  }

  const providesUnpaidCare = answers.caringStatus === 'i-care' && answers.caringIsPaid === 'no';
  if (providesUnpaidCare && !answers.currentBenefits.carersAllowance) {
    benefits.push({
      id: 'carers-allowance',
      title: "Carer's Allowance",
      summary: 'Money to help if you care for someone at least 35 hours a week and they get certain benefits.',
      actionHint: 'You can apply for Carers Allowance online or by post.',
      confidence: 'worth-checking',
    });
  }

  const receivesCarerSupport = answers.caringStatus === 'someone-cares-for-me';
  if (receivesCarerSupport) {
    benefits.push({
      id: 'carer-support',
      title: 'Support for Your Carer',
      summary: 'The person who looks after you may be able to get Carers Allowance or other help.',
      actionHint: 'Ask your carer to check if they can claim Carers Allowance or get a carers assessment from the council.',
      confidence: 'worth-checking',
    });
  }

  const notInCareHome = answers.livingSituation !== 'care-home';
  if ((lowIncome || onMeansTested) && notInCareHome) {
    benefits.push({
      id: 'warm-home-discount',
      title: 'Warm Home Discount',
      summary: 'A one-off discount on your electricity bill during winter if you receive certain benefits or are on a low income.',
      actionHint: 'Contact your energy supplier in autumn to check if you qualify.',
      confidence: 'worth-checking',
    });
  }

  if (isOver65) {
    const qualifiesForBusPass = answers.ageBand &&
      (answers.ageBand === '75-84' || answers.ageBand === '85+' ||
       (answers.country !== 'England' && ['60-64', '65-74', '75-84', '85+'].includes(answers.ageBand)));

    if (qualifiesForBusPass) {
      benefits.push({
        id: 'free-bus-pass',
        title: 'Free Bus Pass',
        summary: 'Free off-peak local bus travel if you have reached State Pension age (currently 66 in England, 60 elsewhere).',
        actionHint: 'Apply through your local council for a free bus pass.',
        confidence: 'very-likely',
      });
    }
  }

  if (answers.ageBand && ['65-74', '75-84', '85+'].includes(answers.ageBand) && (answers.currentBenefits.pensionCredit || onMeansTested)) {
    benefits.push({
      id: 'winter-fuel-payment',
      title: 'Winter Fuel Payment',
      summary: 'An annual payment to help with heating costs during winter if you receive Pension Credit or other qualifying means-tested benefits.',
      actionHint: 'This is usually paid automatically if you get an eligible benefit. Contact the Winter Fuel Payment helpline if you think you should get it but have not.',
      confidence: 'very-likely',
    });
  }

  const over75 = answers.ageBand === '75-84' || answers.ageBand === '85+';
  if (over75 && (answers.currentBenefits.pensionCredit || onMeansTested)) {
    benefits.push({
      id: 'tv-licence',
      title: 'Free TV Licence',
      summary: 'Free TV licence if you are aged 75 or over and receive Pension Credit.',
      actionHint: 'Contact TV Licensing to apply for a free licence.',
      confidence: 'worth-checking',
    });
  }

  if ((hasSignificantDisability || needsMultipleHelp) && answers.housingType &&
      ['own-no-mortgage', 'own-with-mortgage', 'rent-council'].includes(answers.housingType)) {
    benefits.push({
      id: 'home-adaptations',
      title: 'Home Adaptation Grants',
      summary: 'Help with the cost of adapting your home (like grab rails, ramps, or stairlifts) if you have a disability.',
      actionHint: 'Contact your local council to ask about Disabled Facilities Grants or other home improvement schemes.',
      confidence: 'ask-adviser',
    });
  }

  return benefits;
}
