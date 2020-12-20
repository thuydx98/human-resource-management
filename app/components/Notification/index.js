import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import NotificationAlert from 'react-notification-alert';

const Notification = forwardRef((props, ref) => {
  const notificationAlert = useRef(null);
  useImperativeHandle(ref, () => ({
    notifySuccess(message) {
      notificationAlert.current.notificationAlert({
        place: 'tr',
        message: (
          <div>
            <b>Success</b> - {message}
          </div>
        ),
        type: 'info',
        icon: 'tim-icons icon-bell-55',
        autoDismiss: 7,
      });
    },
    notifyError(message) {
      notificationAlert.current.notificationAlert({
        place: 'tr',
        message: (
          <div>
            <b>Error</b> - {message}
          </div>
        ),
        type: 'danger',
        icon: 'tim-icons icon-bell-55',
        autoDismiss: 7,
      });
    },
  }));

  return (
    <div className="react-notification-alert-container">
      <NotificationAlert ref={notificationAlert} />
    </div>
  );
});

export default memo(Notification);
