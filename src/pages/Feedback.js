import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restart } from '../redux/actions';
import Header from '../components/Header';

class Feedback extends React.Component {
  newGame = () => {
    const { history, dispatch } = this.props;
    dispatch(restart());
    history.push('/');
  };

  goToRanking = () => {
    const { history, dispatch } = this.props;
    dispatch(restart());
    history.push('/ranking');
  };

  render() {
    const { total, question } = this.props;
    // const total = 0; // variável para receber pontuação total
    // const question = 0; // variável para receber total de perguntas certas
    const MINIMUM_SCORE = 2;
    return (
      <div>
        <Header />
        <h1
          data-testid="feedback-total-score"
        >
          {`${total}`}
        </h1>
        <h1
          data-testid="feedback-total-question"
        >
          {`${question}`}
        </h1>
        { question <= MINIMUM_SCORE
        && <h2 data-testid="feedback-text">Could be better...</h2> }
        { question > MINIMUM_SCORE
        && <h2 data-testid="feedback-text">Well Done!</h2> }
        <button
          type="button"
          onClick={ this.newGame }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={ this.goToRanking }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.player.score,
  question: state.player.assertions,
});

Feedback.propTypes = {
  total: PropTypes.number.isRequired,
  question: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
