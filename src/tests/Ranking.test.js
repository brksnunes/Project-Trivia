import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

const object = { name: "James", assertions: 2, score: 80, gravatarEmail: "james@gmail.com" };
const object2 = { name: "Wesley", assertions: 4, score: 160, gravatarEmail: "wesley@gmail.com" };
localStorage.setItem('results', JSON.stringify([object, object2]));

describe('Teste da página de Ranking', () => {
  test('Testa se os nomes aparecem na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');
    const heading = screen.getByTestId('ranking-title');
    const imgs = screen.getAllByTestId('header-profile-picture');
    for (let index = 0; index < imgs.length; index += 1) {
      const name = screen.getByTestId(`player-name-${index}`);
      const score = screen.getByTestId(`player-score-${index}`);
      expect(name).toBeInTheDocument();
      expect(score).toBeInTheDocument();
    }
    const button = screen.getByTestId('btn-go-home');
    expect(heading).toBeInTheDocument();
    expect(imgs).toHaveLength(2);
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/');
  })
})
