import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { sumScore } from '../redux/actions';
import timer from '../assets/timer.png';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      isClicked: false,
      questions: [],
      counter: 30,
      aux: true,
      assertions: 0,
    };
  }

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

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  timeCounter = () => {
    const ONE_SECOND = 1000;
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

  onClick = (event) => {
    const { game: { questions }, addScore } = this.props;
    this.setState({ isClicked: true, aux: false }, () => {
      if (event !== undefined) {
        const { target } = event;
        const { name } = target;
        if (name === 'correct') {
          this.setState((prev) => ({
            assertions: prev.assertions + 1,
          }));
          const { counter, currentQuestion } = this.state;
          const difficult = questions[currentQuestion].difficulty;
          const number1 = 1;
          const number2 = 2;
          const number3 = 3;
          const number10 = 10;
          const easy = difficult === 'easy' ? number1 : 0;
          const medium = difficult === 'medium' ? number2 : 0;
          const hard = difficult === 'hard' ? number3 : 0;
          const score = number10 + (counter * (easy + medium + hard));
          const { assertions } = this.state;
          addScore([score, (assertions + 1)]);
        }
      }
    });
    clearInterval(this.intervalID);
  };

  nextQuestion = () => {
    const { currentQuestion } = this.state;
    const { history, player } = this.props;
    const maxNum = 4;
    if (currentQuestion === maxNum) {
      if (localStorage.getItem('results')) {
        const list = JSON.parse(localStorage.getItem('results'));
        list.push(player);
        localStorage.setItem('results', JSON.stringify(list));
      } else {
        const list = [];
        list.push(player);
        localStorage.setItem('results', JSON.stringify(list));
      }
      history.push('/feedback');
    }

    this.setState((prevState) => ({
      counter: 30,
      aux: true,
      isClicked: false,
      currentQuestion: prevState.currentQuestion + 1,
    }));
    this.timeCounter();
  };

  decodeEntity = (inputStr) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
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
              className="alternative-button"
              name="correct"
              type="button"
              data-testid="correct-answer"
              key={ index }
              disabled={ isClicked }
            >
              { this.decodeEntity(answer) }
            </button>);
        } else {
          const key = questions[currentQuestion].incorrect_answers.indexOf(answer);
          button = (
            <button
              style={ {
                border: isClicked ? '3px solid red' : '',
              } }
              onClick={ this.onClick }
              className="alternative-button"
              name="incorrect"
              type="button"
              data-testid={ `wrong-answer-${key}` }
              key={ index }
              disabled={ isClicked }
            >
              { this.decodeEntity(answer) }
            </button>
          );
        }
        return button;
      });
    }
    return (
      <div>
        <Header />
        { questions[currentQuestion] && (
          <div className="question-section-container">
            <div className="question-container">
              <div className="category-container">
                <p data-testid="question-category">
                  {questions[currentQuestion].category}
                </p>
              </div>
              <p data-testid="question-text">
                { this.decodeEntity(questions[currentQuestion].question) }
              </p>
              <div className="timer-container">
                <img src={ timer } alt="timer" />
                <p>{`Tempo: ${counter}`}</p>
              </div>
            </div>
            <div data-testid="answer-options" className="buttons-container">
              {answersButtons}
              {isClicked && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.nextQuestion }
                  className="next-button"
                >
                  Next
                </button>)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  game: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addScore: PropTypes.func.isRequired,
  player: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  addScore: (state) => dispatch(sumScore(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
