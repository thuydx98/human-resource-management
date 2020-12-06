import service, { handleGeneralError } from './index';

const BASE_URL = process.env.REACT_APP_API;

export function getEmployees() {
  return service(BASE_URL, {
    url: '/manager/listAllUser',
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function createEmployee(email, password) {
  return service(BASE_URL, {
    url: '/manager/register',
    method: 'POST',
    data: { email, password },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function updateEmployee(payload) {
  return service(BASE_URL, {
    url: '/manager/createDetail',
    method: 'PUT',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
