import service, { handleGeneralError } from './index';

const BASE_URL = process.env.API_URI;

export function getUsers() {
  return service(BASE_URL, {
    url: '/users',
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function getUser(userId) {
  return service(BASE_URL, {
    url: `/users/${userId}`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function createUser(email, password) {
  return service(BASE_URL, {
    url: '/users',
    method: 'POST',
    data: { email, password },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function updateUser(payload) {
  return service(BASE_URL, {
    url: '/users',
    method: 'PUT',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
