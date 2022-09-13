import { NEW_PLAYER, SUM_SCORE, RESTART } from '../actions';

const INITIAL_STATE = {
  name: 'nome-da-pessoa',
  assertions: 0,
  score: 0,
  gravatarEmail: 'email-da-pessoa',
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case NEW_PLAYER:
    return { ...state, name: action.payload.name, gravatarEmail: action.payload.email };
  case SUM_SCORE:
    return {
      ...state,
      score: state.score + action.payload[0],
      assertions: action.payload[1],
    };
  case RESTART:
    return {
      name: 'nome-da-pessoa',
      assertions: 0,
      score: 0,
      gravatarEmail: 'email-da-pessoa',
    };
  default:
    return state;
  }
}
