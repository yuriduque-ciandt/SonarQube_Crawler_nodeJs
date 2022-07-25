import React from 'react';

import './app.css';
import Theme from './theme';
import SonarReposProvider from './context/SonarReposContext';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <Theme>
      <SonarReposProvider>
        <Header />
        <Home />
      </SonarReposProvider>
    </Theme>
  );
}

export default App;
