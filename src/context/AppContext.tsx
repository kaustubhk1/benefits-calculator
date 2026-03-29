import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { UserAnswers, Screen, Benefit } from '../types';
import { supabase } from '../utils/supabase';

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  answers: UserAnswers;
  updateAnswers: (updates: Partial<UserAnswers>) => void;
  resetAnswers: () => void;
  eligibleBenefits: Benefit[];
  setEligibleBenefits: (benefits: Benefit[]) => void;
  user: User | null;
  session: Session | null;
  signOut: () => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateAnswers = (updates: Partial<UserAnswers>) => {
    setAnswers(prev => ({ ...prev, ...updates }));
  };

  const resetAnswers = () => {
    setAnswers(initialAnswers);
    setEligibleBenefits([]);
    setCurrentScreen('welcome');
  };

  const signOut = async () => {
    await supabase.auth.signOut();
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
        user,
        session,
        signOut,
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
