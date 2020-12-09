import service, { handleGeneralError } from './index';

const BASE_URL = process.env.API_URI;

export function getEmployees() {
  return service(BASE_URL, {
    url: '/manager/list-all-user',
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function createEmployee(email, password) {
  return service(BASE_URL, {
    url: '/manager/create/employee',
    method: 'POST',
    data: { email, password },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function updateEmployee(payload) {
  return service(BASE_URL, {
    url: '/manager/employee-detail/create',
    method: 'PUT',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
