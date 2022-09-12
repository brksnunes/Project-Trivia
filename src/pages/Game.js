import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const ONE_SECOND = 1000;
class Game extends React.Component {
  state = {
    currentQuestion: 0,
    isClicked: false,
    questions: [],
    counter: 30,
    aux: true,
  };

  componentDidMount() {
    const { history, game } = this.props;
    const { response_code: responseCode } = game;
    if (responseCode !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      questions: this.gerarNovoArray(),
    });
    this.timeCounter();
  }

  componentDidUpdate() {
    const { counter, aux } = this.state;
    if (counter === 0 && aux === true) {
      this.onClick();
    }
  }

  timeCounter = () => {
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({ counter: prevState.counter - 1 }));
    }, ONE_SECOND);
  };

  embaralharArray = (array) => {
    const number = 0.5;
    return array.sort(() => Math.random() - number);
  };

  gerarNovoArray = () => {
    const { game: { questions } } = this.props;
    return questions.map((question) => ({
      ...question,
      answers: this.embaralharArray([...question.incorrect_answers,
        question.correct_answer]) }));
  };

  onClick = () => {
    this.setState({ isClicked: true, aux: false });
    clearInterval(this.intervalID);
  };

  render() {
    const { currentQuestion, isClicked, questions, counter } = this.state;
    let answersButtons;

    if (questions[currentQuestion]) {
      answersButtons = questions[currentQuestion].answers.map((answer, index) => {
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
              disabled={ isClicked }
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
              disabled={ isClicked }
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
            <p>{ counter }</p>
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
