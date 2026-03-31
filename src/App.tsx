import React, { Suspense } from 'react';
import { useApp } from './context/AppContext';

// Lazy load screens to drastically reduce initial javascript payload
const WelcomeScreen = React.lazy(() => import('./screens/WelcomeScreen').then(module => ({ default: module.WelcomeScreen })));
const AboutYouScreen = React.lazy(() => import('./screens/AboutYouScreen').then(module => ({ default: module.AboutYouScreen })));
const IncomeScreen = React.lazy(() => import('./screens/IncomeScreen').then(module => ({ default: module.IncomeScreen })));
const SavingsScreen = React.lazy(() => import('./screens/SavingsScreen').then(module => ({ default: module.SavingsScreen })));
const HousingScreen = React.lazy(() => import('./screens/HousingScreen').then(module => ({ default: module.HousingScreen })));
const HealthScreen = React.lazy(() => import('./screens/HealthScreen').then(module => ({ default: module.HealthScreen })));
const CaringScreen = React.lazy(() => import('./screens/CaringScreen').then(module => ({ default: module.CaringScreen })));
const ResultsScreen = React.lazy(() => import('./screens/ResultsScreen').then(module => ({ default: module.ResultsScreen })));
const LetterScreen = React.lazy(() => import('./screens/LetterScreen').then(module => ({ default: module.LetterScreen })));
const AuthScreen = React.lazy(() => import('./screens/AuthScreen').then(module => ({ default: module.AuthScreen })));

function App() {
  const { currentScreen } = useApp();

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full mb-4"></div>
          <p className="text-gray-600 font-medium">Loading securely...</p>
        </div>
      </div>
    }>
      {currentScreen === 'welcome' && <WelcomeScreen />}
      {currentScreen === 'about-you' && <AboutYouScreen />}
      {currentScreen === 'income' && <IncomeScreen />}
      {currentScreen === 'savings' && <SavingsScreen />}
      {currentScreen === 'housing' && <HousingScreen />}
      {currentScreen === 'health' && <HealthScreen />}
      {currentScreen === 'caring' && <CaringScreen />}
      {currentScreen === 'results' && <ResultsScreen />}
      {currentScreen === 'letter' && <LetterScreen />}
      {currentScreen === 'auth' && <AuthScreen />}
    </Suspense>
  );
}

export default App;
