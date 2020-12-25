import service, { handleGeneralError } from '../index';

const BASE_URL = process.env.API_URI;

export function getList(year, userId) {
  return service(BASE_URL, {
    url: `/users/${userId}/leaves/${year}`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function create(payload, userId) {
  return service(BASE_URL, {
    url: `/users/${userId}/leaves`,
    method: 'POST',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function cancel(leaveId, userId) {
  return service(BASE_URL, {
    url: `/users/${userId}/leaves/${leaveId}/cancel`,
    method: 'PUT',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
