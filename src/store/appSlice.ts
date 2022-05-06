import { State, FormCardData, DisplayedCardData } from './../types/types';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: State = { searchValue: '', formCards: [] };

const addFormCard: CaseReducer<State, PayloadAction<FormCardData>> = (state, action) => {
  state.formCards.push(action.payload);
};

const addSearchValue: CaseReducer<State, PayloadAction<string>> = (state, action) => {
  state.searchValue = action.payload;
};

const setDisplayedCard: CaseReducer<State, PayloadAction<DisplayedCardData | undefined>> = (
  state,
  action
) => {
  if (action.payload) state.displayedCard = action.payload;
};

export const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    addSearchValue,
    addFormCard,
    setDisplayedCard,
  },
});

export const {
  addSearchValue: addSearchValueAction,
  addFormCard: addFormCardAction,
  setDisplayedCard: setDisplayedCardAction,
} = appSlice.actions;

export const appReducer = appSlice.reducer;
