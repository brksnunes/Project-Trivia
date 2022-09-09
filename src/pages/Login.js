import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import getToken from '../services/api';
import { addPlayer } from '../redux/actions';

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
    const { history, addUser } = this.props;
    const { name, email } = this.state;
    const user = { name, email };
    addUser(user);
    const token = await getToken();
    this.setState({ token });
    localStorage.setItem('token', token);
    history.push('/game');
  };

  settingsButtonHandler = () => {
    const { history } = this.props;
    history.push('/settings');
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
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.settingsButtonHandler }
        >
          Configurações
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (state) => dispatch(addPlayer(state)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
