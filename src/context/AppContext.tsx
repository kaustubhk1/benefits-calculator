import { createContext, useContext, useState, ReactNode } from 'react';
import { UserAnswers, Screen, Benefit } from '../types';

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  answers: UserAnswers;
  updateAnswers: (updates: Partial<UserAnswers>) => void;
  resetAnswers: () => void;
  eligibleBenefits: Benefit[];
  setEligibleBenefits: (benefits: Benefit[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialAnswers: UserAnswers = {
  mode: 'self',
  ageBand: null,
  country: null,
  livingSituation: null,
  incomeBand: null,
  currentBenefits: {
    statePension: false,
    pensionCredit: false,
    housingBenefit: false,
    councilTaxReduction: false,
    attendanceAllowance: false,
    pip: false,
    carersAllowance: false,
    universalCredit: false,
    dontKnow: false,
  },
  savingsBand: null,
  housingType: null,
  paysCouncilTax: null,
  hasDisability: null,
  dailyHelpNeeds: {
    washing: false,
    dressing: false,
    bedChair: false,
    toilet: false,
    movingIndoors: false,
    cooking: false,
    medicines: false,
    none: false,
  },
  hadFall: null,
  caringStatus: null,
  caringIsPaid: null,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [answers, setAnswers] = useState<UserAnswers>(initialAnswers);
  const [eligibleBenefits, setEligibleBenefits] = useState<Benefit[]>([]);

  const updateAnswers = (updates: Partial<UserAnswers>) => {
    setAnswers(prev => ({ ...prev, ...updates }));
  };

  const resetAnswers = () => {
    setAnswers(initialAnswers);
    setEligibleBenefits([]);
    setCurrentScreen('welcome');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        answers,
        updateAnswers,
        resetAnswers,
        eligibleBenefits,
        setEligibleBenefits,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
