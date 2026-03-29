import { expect, test, describe } from 'vitest';
import { calculateEligibleBenefits } from './benefitLogic';
import { UserAnswers } from '../types';

const defaultAnswers: UserAnswers = {
  ageBand: '65-74',
  country: 'England',
  housingType: 'own-no-mortgage',
  livingSituation: 'living-alone',
  incomeBand: 'over-500',
  savingsBand: 'over-16000',
  currentBenefits: {
    universalCredit: false,
    pensionCredit: false,
    housingBenefit: false,
    attendanceAllowance: false,
    carersAllowance: false,
    councilTaxReduction: false,
  },
  hasDisability: 'no',
  dailyHelpNeeds: {
    washing: false,
    dressing: false,
    eating: false,
    medication: false,
    none: true,
  },
  caringStatus: 'no',
  caringIsPaid: 'no',
  paysCouncilTax: 'yes',
};

describe('calculateEligibleBenefits', () => {
  test('returns Free Bus Pass for over 75 in England', () => {
    const answers = { ...defaultAnswers, ageBand: '75-84' };
    const benefits = calculateEligibleBenefits(answers);
    expect(benefits.some(b => b.id === 'free-bus-pass')).toBe(true);
  });

  test('returns Pension Credit for low income and under 16k savings', () => {
    const answers = { ...defaultAnswers, incomeBand: 'under-200', savingsBand: 'under-6000' };
    const benefits = calculateEligibleBenefits(answers);
    expect(benefits.some(b => b.id === 'pension-credit')).toBe(true);
  });

  test('returns Winter Fuel Payment for pension age on Pension Credit', () => {
    const answers = { ...defaultAnswers, ageBand: '65-74', currentBenefits: { ...defaultAnswers.currentBenefits, pensionCredit: true } };
    const benefits = calculateEligibleBenefits(answers);
    expect(benefits.some(b => b.id === 'winter-fuel-payment')).toBe(true);
  });

  test('returns Winter Fuel Payment for pension age with low income', () => {
    const answers = { ...defaultAnswers, ageBand: '75-84', incomeBand: 'under-200' };
    const benefits = calculateEligibleBenefits(answers);
    expect(benefits.some(b => b.id === 'winter-fuel-payment')).toBe(true);
  });

  test('does NOT return Winter Fuel Payment for high income and no means-tested benefits', () => {
    const answers = { ...defaultAnswers, ageBand: '65-74', incomeBand: 'over-500' };
    const benefits = calculateEligibleBenefits(answers);
    expect(benefits.some(b => b.id === 'winter-fuel-payment')).toBe(false);
  });

  test('returns Attendance Allowance for over 65 with significant disability', () => {
    const answers = { ...defaultAnswers, ageBand: '75-84', hasDisability: 'yes-lot' };
    const benefits = calculateEligibleBenefits(answers);
    expect(benefits.some(b => b.id === 'attendance-allowance')).toBe(true);
  });

  test('returns Carers Allowance for unpaid care', () => {
    const answers = { ...defaultAnswers, caringStatus: 'i-care', caringIsPaid: 'no' };
    const benefits = calculateEligibleBenefits(answers);
    expect(benefits.some(b => b.id === 'carers-allowance')).toBe(true);
  });

  test('returns Council Tax Reduction for low income', () => {
    const answers = { ...defaultAnswers, incomeBand: 'under-200', paysCouncilTax: 'yes' };
    const benefits = calculateEligibleBenefits(answers);
    expect(benefits.some(b => b.id === 'council-tax-reduction')).toBe(true);
  });

  test('returns Free TV Licence for over 75 on Pension Credit', () => {
    const answers = { ...defaultAnswers, ageBand: '75-84', currentBenefits: { ...defaultAnswers.currentBenefits, pensionCredit: true } };
    const benefits = calculateEligibleBenefits(answers);
    expect(benefits.some(b => b.id === 'tv-licence')).toBe(true);
  });
});
