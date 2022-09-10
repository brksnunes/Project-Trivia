import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    currentQuestion: 0,
    isClicked: false,
  };

  componentDidMount() {
    const { history } = this.props;
    const { game } = this.props;
    const { response_code: responseCode } = game;
    console.log(responseCode, '*');
    if (responseCode !== 0) {
      console.log(responseCode);
      localStorage.removeItem('token');
      history.push('/');
    }
  }
  // algoritmo de embaralhamento de Fisher-Yates
  // https://pt.stackoverflow.com/questions/406037/mostrar-elementos-de-um-array-em-ordem-aleat%c3%b3ria/406059#406059

  // embaralharArray = (array) => {
  //   if (array.length === 2) {
  //     const temp = array[0];
  //     array[0] = array[1];
  //     array[1] = temp;
  //   }
  //   for (let index = array.length - 1; index >= 1; index -= 1) {
  //     const j = Math.floor(Math.random() * index);
  //     const temp = array[index];
  //     array[index] = array[j];
  //     array[j] = temp;
  //   }
  //   return array;
  // };

  embaralharArray = (array) => {
    const number = 0.5;
    return array.sort(() => Math.random() - number);
  };

  onClick = () => {
    this.setState({ isClicked: true });
  };

  render() {
    const { game: { questions } } = this.props;
    const { currentQuestion, isClicked } = this.state;
    let answersButtons;
    if (questions[currentQuestion]) {
      const answers = [...questions[currentQuestion].incorrect_answers,
        questions[currentQuestion].correct_answer];
      answersButtons = this.embaralharArray(answers).map((answer, index) => {
        let button;
        if (answer === questions[currentQuestion].correct_answer) {
          button = (
            <button
              style={ {
                border: isClicked ? '3px solid rgb(6, 240, 15)' : '',
              } }
              onClick={ this.onClick }
              type="button"
              data-testid="correct-answer"
              key={ index }
            >
              {answer}

            </button>);
        } else {
          const key = questions[currentQuestion].incorrect_answers.indexOf(answer);
          button = (
            <button
              style={ {
                border: isClicked ? '3px solid red' : '',
              } }
              onClick={ this.onClick }
              type="button"
              data-testid={ `wrong-answer-${key}` }
              key={ index }
            >
              {answer}
            </button>
          );
        }
        return button;
      });
    }
    return (
      <div>
        <Header />
        <h2>Game</h2>
        { questions[currentQuestion] && (
          <div>
            <p data-testid="question-category">
              { questions[currentQuestion].category }
            </p>
            <p data-testid="question-text">
              { questions[currentQuestion].question }
            </p>
            <div data-testid="answer-options">{ answersButtons }</div>
          </div>
        )}
        { isClicked
        && (
          <button
            type="button"
            data-testid="btn-next"
          >
            Next
          </button>)}
      </div>
    );
  }
}

Game.propTypes = {
  game: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(Game);
