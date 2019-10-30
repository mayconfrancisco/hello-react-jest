import produce from 'immer';

export const INTIAL_STATE = [];

export default function techs(state = INTIAL_STATE, action) {
  return produce(state, draft => {
    switch(action.type) {
      case 'ADD_TECH':
        draft.push(action.payload.tech);
        break;

      default:
    }
  });
}