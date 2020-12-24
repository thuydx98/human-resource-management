import service, { handleGeneralError } from '../index';

const BASE_URL = process.env.API_URI;

export function save(payload, userId) {
  return service(BASE_URL, {
    url: `/users/${userId}/feedbacks`,
    method: 'POST',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
