import { combineReducers } from 'redux';
import player from './player';
import gameReducer from './game';

const rootReducer = combineReducers({
  player,
  game: gameReducer,
});

export default rootReducer;
