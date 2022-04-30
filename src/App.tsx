import React, { useReducer } from 'react';
import { AppRouter } from './components/AppRouter';
import { Header } from './components/Header';
import { Main } from './components/Main';
import AppContext from './store/context';
import appReducer from './store/reducer';

const App = () => {
  const [appState, dispatchAppState] = useReducer(appReducer, { formCards: [], searchValue: '' });
  return (
    <AppContext.Provider value={{ appState, dispatchAppState }}>
      <Header />
      <Main>
        <AppRouter />
      </Main>
    </AppContext.Provider>
  );
};

export default App;
