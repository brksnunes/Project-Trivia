import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  homePage = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {/* INSERIR RANKING */}
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
