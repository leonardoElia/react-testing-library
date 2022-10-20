import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

const tipos = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
describe('Testando pagina Pokedez', () => {
  test('Teste se a página contém um título h2com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const titulo = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(titulo).toBeInTheDocument();
  });

  test('Teste ser exibido no próximo pokémon da lista quando o botão Próximo pokémonfor clicado', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();
    pokemons.forEach((e) => {
      screen.getByText(e.name);
      userEvent.click(button);
    });
  });

  test('Teste se a Pokédex tem os controles de filtro', () => {
    renderWithRouter(<App />);
    const botoes = screen.getAllByTestId('pokemon-type-button');
    const botaoAll = screen.getByRole('button', { name: 'All' });
    botoes.forEach((e, i) => {
      expect(e).toHaveTextContent(tipos[i]);
      userEvent.click(e);
      expect(screen.getAllByText(tipos[i])).toHaveLength(2);
      expect(botaoAll).toBeInTheDocument();
    });

    userEvent.click(botaoAll);
    const botaoProximo = screen.getByRole('button', { name: 'Próximo pokémon' });
    pokemons.forEach((e) => {
      screen.getByText(e.name);
      userEvent.click(botaoProximo);
    });
  });
});
