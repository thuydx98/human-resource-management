import service, { handleGeneralError } from '../index';

const BASE_URL = process.env.API_URI;

export function getList(time) {
  return service(BASE_URL, {
    url: `/salaries?time=${time}`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function save(payload) {
  return service(BASE_URL, {
    url: `/salaries`,
    method: 'POST',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function exportExcel(payload) {
  return service(BASE_URL, {
    url: `/salaries/export`,
    method: 'POST',
    data: payload,
    responseType: 'blob',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function sendReport(payload) {
  return service(BASE_URL, {
    url: `/salaries/reports/send`,
    method: 'POST',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
