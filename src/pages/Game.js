import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestionsAPI } from '../redux/actions';

class Game extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    dispatch(fetchQuestionsAPI(token));
  }

  render() {
    return (
      <div>
        <Header />
        <h2>Game</h2>
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
