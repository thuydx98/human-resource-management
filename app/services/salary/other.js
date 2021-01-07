import service, { handleGeneralError } from '../index';

const BASE_URL = process.env.API_URI;

export function update(payload) {
  return service(BASE_URL, {
    url: `/salaries/others`,
    method: 'POST',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}