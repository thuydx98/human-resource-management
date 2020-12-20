import service, { handleGeneralError } from './index';

const BASE_URL = process.env.API_URI;

export function getList() {
  return service(BASE_URL, {
    url: '/banks',
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
