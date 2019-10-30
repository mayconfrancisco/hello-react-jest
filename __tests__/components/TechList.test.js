import React from 'react';
import {render, fireEvent} from '@testing-library/react'; //lib que gera um dom do html para realizarmos os testes

import TechList from '~/components/TechList';

describe('Techlist component', () => {
  it('should be able to add new tech', () => {
    const { getByText, getByTestId, debug }  = render(<TechList />);

    debug();
    fireEvent.click(getByText('Adicionar'));
    debug();

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  })
})