import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testando o componente Pokemon', () => {
  const textoD = 'More details';
  test('Teste se é renderizado um cartão com as informações de pokémon específicos', () => {
    renderWithRouter(<App />);
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const linkDetalhes = screen.getByRole('link', { name: textoD });
    expect(linkDetalhes).toBeInTheDocument();
    userEvent.click(linkDetalhes);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Electric')).toBeInTheDocument();
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();
    const imagem = screen.getByAltText('Pikachu sprite');
    expect(imagem.src).toContain(url);
  });

  test('testando URL', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', { name: textoD });
    userEvent.click(linkDetalhes);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos pokémons favoritos', () => {
    renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', { name: textoD });
    userEvent.click(linkDetalhes);
    const inputFavorito = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(inputFavorito);
    const imagemFavorito = screen.getByAltText('Pikachu is marked as favorite');
    expect(imagemFavorito.src).toContain('/star-icon.svg');
    expect(imagemFavorito).toBeInTheDocument();
  });
});
