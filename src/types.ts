export type UserMode = 'self' | 'carer';

export type AgeBand = '60-64' | '65-74' | '75-84' | '85+';

export type Country = 'England' | 'Scotland' | 'Wales' | 'Northern Ireland';

export type LivingSituation =
  | 'alone'
  | 'with-partner'
  | 'with-family'
  | 'sheltered-housing'
  | 'care-home';

export type IncomeBand =
  | 'under-200'
  | '200-300'
  | '300-500'
  | 'over-500';

export type SavingsBand =
  | 'under-6000'
  | '6000-10000'
  | '10000-16000'
  | 'over-16000'
  | 'prefer-not-say';

export type HousingType =
  | 'own-no-mortgage'
  | 'own-with-mortgage'
  | 'rent-council'
  | 'rent-private'
  | 'other';

export type DisabilityLevel = 'yes-lot' | 'yes-little' | 'no';

export type CaringStatus = 'i-care' | 'someone-cares-for-me' | 'no';

export interface CurrentBenefits {
  statePension: boolean;
  pensionCredit: boolean;
  housingBenefit: boolean;
  councilTaxReduction: boolean;
  attendanceAllowance: boolean;
  pip: boolean;
  carersAllowance: boolean;
  universalCredit: boolean;
  dontKnow: boolean;
}

export interface DailyHelpNeeds {
  washing: boolean;
  dressing: boolean;
  bedChair: boolean;
  toilet: boolean;
  movingIndoors: boolean;
  cooking: boolean;
  medicines: boolean;
  none: boolean;
}

export interface UserAnswers {
  mode: UserMode;
  relationshipToCarer?: string;
  ageBand: AgeBand | null;
  country: Country | null;
  livingSituation: LivingSituation | null;
  incomeBand: IncomeBand | null;
  currentBenefits: CurrentBenefits;
  savingsBand: SavingsBand | null;
  housingType: HousingType | null;
  paysCouncilTax: 'yes' | 'no' | 'not-sure' | null;
  hasDisability: DisabilityLevel | null;
  dailyHelpNeeds: DailyHelpNeeds;
  hadFall: 'yes' | 'no' | 'prefer-not-say' | null;
  caringStatus: CaringStatus | null;
  caringIsPaid: 'yes' | 'no' | null;
}

export interface Benefit {
  id: string;
  title: string;
  summary: string;
  actionHint: string;
  confidence: 'very-likely' | 'worth-checking' | 'ask-adviser';
}

export type Screen =
  | 'welcome'
  | 'about-you'
  | 'income'
  | 'savings'
  | 'housing'
  | 'health'
  | 'caring'
  | 'results'
  | 'letter'
  | 'auth';
