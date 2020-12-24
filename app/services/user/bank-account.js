import service, { handleGeneralError } from '../index';

const BASE_URL = process.env.API_URI;

export function save({ id, bankId, accountNumber, accountName }, userId) {
  return service(BASE_URL, {
    url: `/users/${userId}/bank-accounts`,
    method: 'POST',
    data: { id, bankId, accountNumber, accountName },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
