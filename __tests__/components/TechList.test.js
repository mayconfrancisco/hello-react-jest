import React from 'react';
import {render, fireEvent} from '@testing-library/react'; //lib que gera um dom do html para realizarmos os testes

import TechList from '~/components/TechList';

describe('Techlist component', () => {
  it('should be able to add new tech', () => {
    const { getByText, getByTestId, debug, getByLabelText }  = render(<TechList />);

    //fire onchange buscando pelo label do input (htmlFor) - e.target.value
    fireEvent.change(getByLabelText('Tech'), {target: {value: 'Node.js'}});
    fireEvent.submit(getByTestId('tech-form'));

    // debug(); //debug mostra a arvore dom antes e depois dos comandos entre o debug();
    // fireEvent.click(getByText('Adicionar'));
    // debug();

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByLabelText('Tech')).toHaveValue('');
  })
})