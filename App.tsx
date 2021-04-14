import React from 'react';

import { SafeAreaViewContainer } from './src/Core/components/SafeAreaViewContainer';
import { Home } from './src/Home';

const App = () => {
  return (
    <SafeAreaViewContainer>
      <Home />
    </SafeAreaViewContainer>
  );
};

export default App;
