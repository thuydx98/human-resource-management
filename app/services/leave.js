import service, { handleGeneralError } from './index';

const BASE_URL = process.env.API_URI;

export function createLeave(salaryType, reason, time, type) {
  return service(BASE_URL, {
    url: '/manager/create/absent',
    method: 'POST',
    data: { salaryType, persentReason: reason, time, type },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function updateLeave(id, salaryType, reason, time, type) {
  return service(BASE_URL, {
    url: `/manager/update/absent?id=${id}`,
    method: 'POST',
    data: { salaryType, persentReason: reason, time, type },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
