import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {render, fireEvent } from '@testing-library/react';

import { addTech } from '~/store/modules/techs/actions';

import TechList from '~/components/TechListRedux';

//Lembre-se temos que testar apenas nossos componentes - mockamos tudo que for externo
jest.mock('react-redux'); //a patir de agora sempre que o redux for utilizado em nosos componentes nos testes o redux sera mockado

describe('Techlist REDUX component', () => {

  it('should render tech list', () => {
    useSelector.mockImplementation(cb => cb({techs: ['Node.js', 'ReactJS']}));

    const { getByTestId, getByText } = render(<TechList />)

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
  });

  it('should be able to add new tech' , () => {
    const {getByTestId, getByLabelText} = render(<TechList />);

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText('Tech'), {target: {value: 'Node.js'}});
    fireEvent.submit(getByTestId('tech-form'));

    console.log(dispatch.mock.calls); //retorna todas as chamadas a dispatch

    expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'))
  })
});