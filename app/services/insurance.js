import service, { handleGeneralError } from './index';

const BASE_URL = process.env.API_URI;

export function update({ id, bookNo, hospital, effectiveDate }, userId) {
  return service(BASE_URL, {
    url: `/users/${userId}/insurance`,
    method: 'POST',
    data: { id, bookNo, hospital, effectiveDate },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
