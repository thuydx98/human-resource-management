import { isNil } from 'lodash/fp';
import moment from 'moment';

class AuthInfo {
  static propTypes = {
    accessToken: String,
    expiresIn: Number,
    loggedInAt: String,
  };

  constructor(authInfo) {
    if (!isNil(authInfo)) {
      const { token, accessToken, loggedInAt } = authInfo;
      this.accessToken = token || accessToken;
      this.expiresIn = 63072000;
      this.loggedInAt = loggedInAt || moment().format();
    }
  }

  isValid = () =>
    moment() < moment(this.loggedInAt).add(this.expiresIn, 'seconds');
}

export default AuthInfo;
