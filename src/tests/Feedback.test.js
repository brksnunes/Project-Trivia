import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import mockFetch from './helpers/mockFetch';
import { questionsResponse } from '../../cypress/mocks/questions';

const NAME = 'xablau júnior';
const EMAIL = 'xablau@bol.com';
const { results: questions } = questionsResponse;

describe('Teste da página de Feedbacks', () => {
  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Se volta para tela de Login ao clicar botão /Play Again/', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const entrarButton = screen.getByTestId('btn-play');
    userEvent.type(nameInput, NAME);
    userEvent.type(emailInput, EMAIL);

    userEvent.click(entrarButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    for (let index = 0; index < questions.length; index += 1 ) {
      const correctButton = screen.getByTestId('correct-answer');
      userEvent.click(correctButton);
      const nextButton = screen.getByTestId('btn-next');
      userEvent.click(nextButton);
    }
    expect(history.location.pathname).toBe('/feedback');
    const playAgainButton = screen.getByTestId('btn-play-again');
    expect(playAgainButton).toBeInTheDocument();
    userEvent.click(playAgainButton);
    expect(history.location.pathname).toBe('/');
  });
  test('Se renderiza mensagem de feedback e redireciona para a tela Ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const entrarButton = screen.getByTestId('btn-play');
    userEvent.type(nameInput, NAME);
    userEvent.type(emailInput, EMAIL);

    userEvent.click(entrarButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    for (let index = 0; index < questions.length; index += 1 ) {
      const wrongButtons = screen.queryAllByTestId(/wrong-answer/i);
      userEvent.click(wrongButtons[0]);
      const nextButton = screen.getByTestId('btn-next');
      userEvent.click(nextButton);
    }
    expect(history.location.pathname).toBe('/feedback');
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent('Could be better...');
    const rankingButton = screen.getByTestId('btn-ranking');
    expect(rankingButton).toBeInTheDocument();
    userEvent.click(rankingButton);
    expect(history.location.pathname).toBe('/ranking');
  });
})
