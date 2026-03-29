import { useApp } from './context/AppContext';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { AboutYouScreen } from './screens/AboutYouScreen';
import { IncomeScreen } from './screens/IncomeScreen';
import { SavingsScreen } from './screens/SavingsScreen';
import { HousingScreen } from './screens/HousingScreen';
import { HealthScreen } from './screens/HealthScreen';
import { CaringScreen } from './screens/CaringScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { LetterScreen } from './screens/LetterScreen';
import { AuthScreen } from './screens/AuthScreen';

function App() {
  const { currentScreen } = useApp();

  return (
    <>
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
    </>
  );
}

export default App;
