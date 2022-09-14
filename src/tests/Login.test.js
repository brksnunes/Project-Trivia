import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
import Login from '../pages/Login';
import { mockFetch } from './helpers/mockFetch';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Login page', () => {
  test('If Login page is rendered correctly', () => {
    renderWithRouterAndRedux(<App />);
    const mainLogo = screen.getAllByRole('img');
    expect(mainLogo[0]).toHaveAttribute('alt', 'logo');
    expect(mainLogo[0]).toBeInTheDocument();
    expect(mainLogo[1]).toBeInTheDocument();
    expect(mainLogo).toHaveLength(2);
  });
  test('If the login page has the correct inputs', () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });
  test('If button "Entrar" is validated correctly', () => {
    renderWithRouterAndRedux(<App />);
    const NAME = 'xablau júnior';
    const EMAIL = 'xablau@bol.com';

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const entrarButton = screen.getByTestId('btn-play');

    expect(entrarButton).toBeInTheDocument();

    // Types username
    userEvent.type(nameInput, NAME);
    expect(entrarButton).toBeDisabled();

    // Clears name field and assert if button is still disabled
    userEvent.clear(nameInput);
    expect(entrarButton).toBeDisabled();

    // Types email
    userEvent.type(emailInput, EMAIL);
    expect(entrarButton).toBeDisabled();

    // Clears email field and assert if button is still disabled
    userEvent.clear(emailInput);
    expect(entrarButton).toBeDisabled();

    userEvent.type(nameInput, NAME);
    userEvent.type(emailInput, EMAIL);
    expect(entrarButton).not.toBeDisabled();
  });
  test('If the route to "/settings" works as expected', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsButton = screen.getByTestId('btn-settings');

    userEvent.click(settingsButton);
    expect(history.location.pathname).toBe('/settings');
    const homeButton = screen.getByRole('button', { name: 'Início' });
    expect(homeButton).toBeInTheDocument();
    userEvent.click(homeButton);
    expect(history.location.pathname).toBe('/');
  });
  test('If the route to "/game" works as expected', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouterAndRedux(<App />);

    const NAME = 'xablau júnior';
    const EMAIL = 'xablau@bol.com';

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const entrarButton = screen.getByTestId('btn-play');

    userEvent.type(nameInput, NAME);
    userEvent.type(emailInput, EMAIL);
    expect(entrarButton).not.toBeDisabled();

    userEvent.click(entrarButton);

    // The waitFor method waits for a promise to be resolved before it makes a assertion.
    // REF: https://testing-library.com/docs/dom-testing-library/api-async
    await waitFor(() => expect(global.fetch).toHaveBeenCalled(), { timeout: 10000 });
    expect(history.location.pathname).toBe('/game');
    global.fetch.mockClear();
  });
});
