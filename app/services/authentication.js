import service, { handleGeneralError } from './index';

const BASE_URL = process.env.API_URI;
export function login(email, password) {
  return service(BASE_URL, {
    url: '/login',
    method: 'POST',
    data: { email, password },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function me() {
  return service(BASE_URL, {
    url: '/me',
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function changePassword(oldPassword, newPassword, confirmPassword) {
  return service(BASE_URL, {
    url: '/changePassword',
    method: 'POST',
    data: { oldPassword, newPassword, confirmPassword },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function update(payload) {
  return service(BASE_URL, {
    url: '/employee/createorupdateDetail',
    method: 'POST',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
