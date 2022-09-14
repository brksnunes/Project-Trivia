import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
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
    const { total, question, info } = this.props;
    const { gravatarEmail } = info;
    const converted = md5(gravatarEmail).toString();
    const MINIMUM_SCORE = 2;
    return (
      <div>
        <Header />
        <div className="feedback-container">
          <img
            src={ `https://www.gravatar.com/avatar/${converted}` }
            alt={ gravatarEmail }
            data-testid="header-profile-picture"
            className="player-picture"
          />
          <div className="feedback-text">
            { question <= MINIMUM_SCORE
          && <h1 data-testid="feedback-text">Could be better...</h1> }
            { question > MINIMUM_SCORE
          && <h1 data-testid="feedback-text">Well Done!</h1> }
            <span>Você acertou </span>
            <span data-testid="feedback-total-question">
              {question}
            </span>
            <span> questões!</span>
            <br />
            <br />
            <span>Um total de </span>
            <span data-testid="feedback-total-score">
              {total}
            </span>
            <span> pontos</span>
          </div>

        </div>
        <div className="feedback-buttons">
          <button
            type="button"
            onClick={ this.goToRanking }
            data-testid="btn-ranking"
          >
            Ranking
          </button>
          <button
            type="button"
            onClick={ this.newGame }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.player.score,
  question: state.player.assertions,
  info: state.player,
});

Feedback.propTypes = {
  total: PropTypes.number.isRequired,
  question: PropTypes.number.isRequired,
  info: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
