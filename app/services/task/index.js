import service, { handleGeneralError } from '../index';

const BASE_URL = process.env.API_URI;

export function getList(times, userId) {
  return service(BASE_URL, {
    url: `/users/${userId}/tasks?time=${times || ''}`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
