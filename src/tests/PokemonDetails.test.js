import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const resumo = 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.';
const textoD = 'More details';

describe('testando a pagina PokemonDetails', () => {
  test('Teste se informações feitas pelo pokémon selecionado as são tiradas na tela', () => {
    renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', { name: textoD });
    userEvent.click(linkDetalhes);
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(linkDetalhes).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 })).toBeInTheDocument();
    expect(screen.getByText(resumo)).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const url = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const url2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const arrayUrl = [url, url2];
    const linkDetalhes = screen.getByRole('link', { name: textoD });
    userEvent.click(linkDetalhes);
    expect(screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
    const imagems = screen.getAllByAltText('Pikachu location');
    expect(imagems).toHaveLength(2);
    imagems.forEach((e, i) => {
      expect(e.src).toContain(arrayUrl[i]);
    });
  });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', { name: textoD });
    userEvent.click(linkDetalhes);
    const inputFavorito = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(inputFavorito);
    const imagemFavorito = screen.getByAltText('Pikachu is marked as favorite');
    expect(imagemFavorito).toBeInTheDocument();
    userEvent.click(inputFavorito);
    expect(imagemFavorito).not.toBeInTheDocument();
  });
});
