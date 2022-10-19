import React from 'react';
import { render, screen } from '@testing-library/react';
// import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('testando componente about', () => {
  test('Testando se a pagina contém informações de pokedez', () => {
    render(<About />);
    const oneP = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons';
    const twoP = 'One can filter Pokémons by type, and see more details for each one of them';
    expect(screen.getByText(oneP)).toBeInTheDocument();
    expect(screen.getByText(twoP)).toBeInTheDocument();
  });

  test('Testando se a pagina contém um titulo h2 com o texto About Pokédex', () => {
    render(<About />);
    const subTitulo = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(subTitulo).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imagem = screen.getByAltText('Pokédex');
    expect(imagem.src).toContain(url);
  });
});
