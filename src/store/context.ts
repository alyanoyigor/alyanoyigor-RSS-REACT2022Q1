import { Action, AppContextData } from './../types/types';
import React from 'react';

const AppContext = React.createContext<AppContextData>({
  appState: { searchValue: '', formCards: [] },
  dispatchAppState: (value: Action) => {},
});
export default AppContext;
