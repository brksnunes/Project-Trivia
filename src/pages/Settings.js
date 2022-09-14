import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Settings extends Component {
  toHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div className="settings-container">
        <h2 className="settings-title" data-testid="settings-title">Settings</h2>
        <p className="settings-construct">Em Construção!</p>
        <button
          type="button"
          className="next-button"
          onClick={ this.toHome }
        >
          Início
        </button>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
