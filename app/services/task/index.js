import service, { handleGeneralError } from '../index';

const BASE_URL = process.env.API_URI;

export function getList(times, userId) {
  return service(BASE_URL, {
    url: `/users/${userId}/tasks?times=${times || ''}`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}

export function save(tasks, userId, saveType = 'save', time = '') {
  return service(BASE_URL, {
    url: `/users/${userId}/tasks/${saveType}?time=${time}`,
    method: 'POST',
    data: tasks,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
}
