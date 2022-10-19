import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('testando pagina não encontrada', () => {
  test('este se a página contém um título h2com o texto Page requested not found', () => {
    render(<NotFound />);

    const titulo = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(titulo).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imagem = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(imagem.src).toContain(url);
  });
});
