import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../assets/login_logo.png';
import trybeLogo from '../assets/trybe.png';
import getToken from '../services/api';
import { addPlayer, fetchQuestionsAPI } from '../redux/actions';

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

  buttonHandler = async () => {
    const { history, addUser, fetchQuestions } = this.props;
    const { name, email } = this.state;
    const user = { name, email };
    addUser(user);
    const token = await getToken();
    localStorage.setItem('token', token);
    await fetchQuestions(token);
    history.push('/game');
  };

  settingsButtonHandler = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, btnDisabled } = this.state;
    return (
      <div className="login-container">
        <img src={ logo } className="App-logo" alt="logo" />
        <div className="form-container">
          <form>
            <input
              onChange={ this.inputHandler }
              className="form-input"
              type="email"
              name="email"
              data-testid="input-gravatar-email"
              placeholder="Qual é o seu e-mail do gravatar?"
              value={ email }
            />
            <input
              onChange={ this.inputHandler }
              className="form-input"
              name="name"
              type="text"
              data-testid="input-player-name"
              placeholder="Qual é o seu nome?"
              value={ name }
            />
            <button
              data-testid="btn-play"
              type="button"
              onClick={ this.buttonHandler }
              disabled={ btnDisabled }
            >
              JOGAR
            </button>
            <button
              data-testid="btn-settings"
              type="button"
              onClick={ this.settingsButtonHandler }
            >
              CONFIGURAÇÕES
            </button>
          </form>
        </div>
        <img src={ trybeLogo } className="App-logo" alt="logo" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (state) => dispatch(addPlayer(state)),
  fetchQuestions: (state) => dispatch(fetchQuestionsAPI(state)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addUser: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
