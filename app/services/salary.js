import service, { handleGeneralError } from './index';

const BASE_URL = process.env.REACT_APP_API;

export function createSalary(absentDate, getSalary) {
  return service(BASE_URL, {
    url: '/manager/create/basicSalary',
    method: 'POST',
    data: { absentDate, getSalary },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function updateSalary(id, absentDate, getSalary) {
  return service(BASE_URL, {
    url: `/manager/update/basicSalary?id=${id}`,
    method: 'POST',
    data: { absentDate, getSalary },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
