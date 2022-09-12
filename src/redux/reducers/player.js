import { NEW_PLAYER, SUM_SCORE } from '../actions';

const INITIAL_STATE = {
  name: 'nome-da-pessoa',
  assertions: 'número-de-acertos',
  score: 0,
  gravatarEmail: 'email-da-pessoa',

};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case NEW_PLAYER:
    return { ...state, name: action.payload.name, gravatarEmail: action.payload.email };
  case SUM_SCORE:
    return { ...state, score: state.score + action.payload };
  default:
    return state;
  }
}
