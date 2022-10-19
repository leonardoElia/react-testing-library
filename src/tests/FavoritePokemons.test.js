import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import FavoritePokemons from '../pages/FavoritePokemons'
import App from '../App';

describe('testando a pagina pokemons favoritos', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found, caso a não tenha pokémons favoritos', () => {
    renderWithRouter(<App />);
    const linkFavoritos = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavoritos);
    const mensagem = screen.getByText('No favorite pokemon found');
    expect(mensagem).toBeInTheDocument();
  });

  test('Teste se são exibidos todos os cards de pokémons favoritos', () => {
    renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetalhes);
    const inputFavorito = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(inputFavorito);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
});
