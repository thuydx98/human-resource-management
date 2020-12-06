import service, { handleGeneralError } from './index';

const BASE_URL = process.env.API_URI;

export function createDepartment(name) {
  return service(BASE_URL, {
    url: '/manager/create/position',
    method: 'POST',
    data: { name },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function updateDepartment(id, name) {
  return service(BASE_URL, {
    url: `/manager/update/position?id=${id}`,
    method: 'POST',
    data: { name },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
