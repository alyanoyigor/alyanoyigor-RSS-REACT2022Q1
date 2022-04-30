import { State, Action } from './../types/types';

const appReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_SEARCH_VALUE':
      return { ...state, searchValue: action.payload };
    case 'ADD_FORM_CARD':
      return { ...state, formCards: [action.payload, ...state.formCards] };
    default:
      return state;
  }
};
export default appReducer;
