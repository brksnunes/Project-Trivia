import { NEW_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: 'nome-da-pessoa',
  assertions: 'número-de-acertos',
  score: 'pontuação',
  gravatarEmail: 'email-da-pessoa',

};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case NEW_PLAYER:
    return { ...state, name: action.payload.name, gravatarEmail: action.payload.email };
  default:
    return state;
  }
}
