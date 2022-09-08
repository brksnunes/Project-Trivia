import PropTypes from 'prop-types';
import React from 'react';
import logo from '../trivia.png';
import getToken from '../services/api';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      btnDisabled: true,
      token: '',
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

  buttonHandler = async () => {
    const { history } = this.props;
    const token = await getToken();
    this.setState({ token });
    localStorage.setItem('token', token);
    history.push('/game');
  };

  render() {
    const { name, email, btnDisabled, token } = this.state;
    console.log(token);
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
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
