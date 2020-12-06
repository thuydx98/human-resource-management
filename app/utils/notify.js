export function notifySuccess(message) {
  this.refs.notify.notificationAlert({
    place: 'tr',
    message,
    type: 'info',
    icon: 'tim-icons icon-check-2',
    autoDismiss: 5,
  });
}

export function notifyError(message) {
  this.refs.notify.notificationAlert({
    place: 'tr',
    message,
    type: 'danger',
    icon: 'tim-icons icon-simple-remove',
    autoDismiss: 5,
  });
}
