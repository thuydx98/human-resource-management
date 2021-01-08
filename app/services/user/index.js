import service, { handleGeneralError } from '../index';

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

export function createUser(email, password, roleId) {
  return service(BASE_URL, {
    url: '/users',
    method: 'POST',
    data: { email, password, roleId },
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

export function uploadAvatar(image, userId) {
  const form = new FormData();
  form.append('avatar', image);

  return service(BASE_URL, {
    url: `/users/${userId}/avatar`,
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: form,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function deleteUser(userId) {
  return service(BASE_URL, {
    url: `/users/${userId}`,
    method: 'DELETE',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
