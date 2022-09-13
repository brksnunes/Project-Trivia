import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { restart } from '../redux/actions';
import logo from '../assets/login_logo.png';
// import Header from '../components/Header';

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
    // const total = 0; // variável para receber pontuação total
    // const question = 0; // variável para receber total de perguntas certas
    const MINIMUM_SCORE = 2;
    return (
      <div>
        {/* <Header /> */}
        <img src={ logo } className="feedback-logo" alt="logo" />
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
            <p
              data-testid="feedback-total-question"
            >
              {`Você acertou ${question} questões!`}
            </p>
            <p
              data-testid="feedback-total-score"
            >
              {`Um total de ${total} pontos`}
            </p>
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
