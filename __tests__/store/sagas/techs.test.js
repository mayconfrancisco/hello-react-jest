import { runSaga } from 'redux-saga';

import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';

import { getTechsSuccess, getTechsFailure } from '~/store/modules/techs/actions';
import { getTechs } from '~/store/modules/techs/sagas';

const apiMock = new MockAdapter(api);

describe('Techs saga', () => {
  it('should be able to fetch techs', async () => {
    const dispatch = jest.fn();

    //toda vez que tiver um get na rota /techs, reply todas as vezes por HttpStatus 200 e response ['Node.js']
    //ha o replyOnce para responder uma vez
    apiMock.onGet('/techs').reply(200, ['Node.js']);

    //dispatch monitora as chamadas ao put
    //getState monitora as chamadas a select e getState - verifique os SagaOptions do runSaga para mais
    await runSaga({dispatch}, getTechs).toPromise(); //runSaga retorna um generator por isso uso o toPromise

    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(['Node.js']));
  })

  it('should fail when api returns error', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('/techs').reply(500);

    await runSaga({dispatch}, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsFailure());
  })
})