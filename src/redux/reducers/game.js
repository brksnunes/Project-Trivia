import { ADD_QUESTIONS, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  questions: [],
  response_code: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUESTIONS:
    return {
      ...state,
      questions: action.payload.results,
      response_code: action.payload.response_code,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
