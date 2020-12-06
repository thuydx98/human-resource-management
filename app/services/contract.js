import service, { handleGeneralError } from './index';

const BASE_URL = process.env.REACT_APP_API;

export function createContract(state, contractTerm, signingDate) {
  return service(BASE_URL, {
    url: '/manager/create/contract',
    method: 'POST',
    data: { state, contractTerm, signingDate },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function updateContract(id, state, contractTerm, signingDate) {
  return service(BASE_URL, {
    url: `/manager/update/contract?id=${id}`,
    method: 'POST',
    data: { state, contractTerm, signingDate },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
