import React from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      btnDisabled: true,
    };
  }

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const { name: player, email } = this.state;
      this.setState({ btnDisabled: !(
        player.length > 0 && email.length > 0
      ) });
    });
  };

  buttonHandler = () => {
    const { history } = this.props;
    history.push('/game');
  };

  render() {
    const { name, email, btnDisabled } = this.state;
    return (
      <form>
        <img src={ logo } className="App-logo" alt="logo" />
        <input
          onChange={ this.inputHandler }
          name="name"
          type="text"
          data-testid="input-player-name"
          placeholder="Insira seu nome"
          value={ name }
        />
        <input
          onChange={ this.inputHandler }
          type="email"
          name="email"
          data-testid="input-gravatar-email"
          placeholder="Insira seu e-mail"
          value={ email }
        />
        <button
          data-testid="btn-play"
          type="button"
          onClick={ this.buttonHandler }
          disabled={ btnDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;
