import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componete App', () => {
  test('Testando se existe links na aba de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();

    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorite).toBeInTheDocument();
  });

  test('Testando direcionamento do link home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testando direcionamento do link About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });
    userEvent.click(about);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testando direcionamento do link favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testando direcionamento para pagina sem rota', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/inexistente');
    });
    const NotFoundTitle = screen.getByText('Page requested not found');
    expect(NotFoundTitle).toBeInTheDocument();
  });
});
