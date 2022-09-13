import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { info } = this.props;
    const { name, gravatarEmail, score } = info;
    const converted = md5(gravatarEmail).toString();
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${converted}` }
          alt={ gravatarEmail }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  info: store.player,
});

Header.propTypes = {
  info: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};

export default connect(mapStateToProps)(Header);
