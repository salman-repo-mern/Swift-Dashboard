import { useState } from 'react';
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import Header from './components/Header'; 
import "./App.css"

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="app-container">
      <Header navigateTo={navigateTo} />
      <div className="p-4">
        {currentScreen === 'profile' ? (
          <Profile navigateTo={navigateTo} />
        ) : (
          <Dashboard navigateTo={navigateTo} />
        )}
      </div>
    </div>
  );
};

export default App;
