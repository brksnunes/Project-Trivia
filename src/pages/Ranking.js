import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import star from '../assets/star.png';
import logo from '../assets/login_logo.png';

class Ranking extends React.Component {
  state = {
    results: [],
  };

  componentDidMount() {
    const results = JSON.parse(localStorage.getItem('results'));
    results.sort((a, b) => b.score - a.score);
    this.setState({ results });
  }

  homePage = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { results } = this.state;
    return (
      <>
        <img src={ logo } className="ranking-logo" alt="logo" />
        <div className="ranking-container">
          <h1 data-testid="ranking-title">Ranking</h1>
          {results.map((player, index) => (
            <div key={ index } className="ranking-item">

              <img
                src={ `https://www.gravatar.com/avatar/${md5(player.gravatarEmail).toString()}` }
                alt={ player.gravatarEmail }
                data-testid="header-profile-picture"
              />
              <p data-testid={ `player-name-${index}` }>
                {player.name}
              </p>
              <div className="ranking-points">
                <img src={ star } alt="logo" />
                <p data-testid={ `player-score-${index}` }>
                  {`${player.score} pontos`}
                </p>
              </div>

            </div>
          ))}
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.homePage }
          >
            JOGAR NOVAMENTE
          </button>
        </div>

      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
