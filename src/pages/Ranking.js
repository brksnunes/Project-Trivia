import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

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
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {results.map((player, index) => (
            <li key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${md5(player.gravatarEmail).toString()}` }
                alt={ player.gravatarEmail }
                data-testid="header-profile-picture"
              />
              <p data-testid={ `player-name-${index}` }>
                {player.name}
              </p>
              <p data-testid={ `player-score-${index}` }>
                {player.score}
              </p>
            </li>
          ))}
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.homePage }
        >
          Go back to homepage
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
