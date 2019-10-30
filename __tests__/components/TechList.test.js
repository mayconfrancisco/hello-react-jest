import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react'; //lib que gera um dom do html para realizarmos os testes

import TechList from '~/components/TechList';

describe('Techlist component', () => {
  // Nao devemos testar APIs externas em nossos testes - usa um mock
  beforeEach(() => {
    localStorage.clear();
  })

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

  //Teste do localstorage
  it('should store techs in storage', () => {
    let { getByTestId, getByLabelText, getByText } = render(<TechList />);

    fireEvent.change(getByLabelText('Tech'), {target: {value: 'Node.js'}});
    fireEvent.submit(getByTestId('tech-form'));

    expect(localStorage.setItem).toHaveBeenCalledWith('techs', JSON.stringify(['Node.js']))

    cleanup(); //limpa toda a dom - quase que como o F5 para o react renderizar toda a página novamente

    ({ getByTestId, getByLabelText, getByText } = render(<TechList />)); //renderizamos o componente novamente

    expect(localStorage.getItem).toHaveBeenCalledWith('techs');
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByLabelText('Tech')).toHaveValue('');

  })
})