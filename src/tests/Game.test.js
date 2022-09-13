import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { mockFetch, mockFetchInvalidToken} from './helpers/mockFetch';
import { questionsResponse, invalidTokenQuestionsResponse } from '../../cypress/mocks/questions';

const NAME = 'xablau júnior';
const EMAIL = 'xablau@bol.com';
const { results: questions } = questionsResponse;

describe('Testar a tela Game.js', () => {
  // beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));

  // afterEach(() => {
  //   global.fetch.mockClear();
  // });

  test('Se redireciona para tela de login quando token é inválido', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetchInvalidToken);
    const { history } = renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const entrarButton = screen.getByTestId('btn-play');
    userEvent.type(nameInput, NAME);
    userEvent.type(emailInput, EMAIL);

    userEvent.click(entrarButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toBe('/');

    global.fetch.mockClear();
  })
  test('Se score de jogador é renderizado corretamente quando acerta as questões com tempo mínimo', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
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
    const headerScore = screen.getByTestId('header-score');
    expect(headerScore.textContent).toBe('350');
    global.fetch.mockClear();
  })
  
  test('Se score de jogador é renderizado corretamente quando acerta as questões com tempo 2s', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
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
      await new Promise((r) => setTimeout(r, 1000));
      userEvent.click(correctButton);
      const nextButton = screen.getByTestId('btn-next');
      userEvent.click(nextButton);
    }
    const headerScore = screen.getByTestId('header-score');
    expect(headerScore.textContent).toBe('340');
    global.fetch.mockClear();
  }, 10000)
})
