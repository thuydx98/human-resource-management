import { isNil } from 'lodash/fp';
import moment from 'moment';

class AuthInfo {
  static propTypes = {
    accessToken: String,
    expiresIn: Number,
    loggedInAt: String,
    id: String,
    role: String,
  };

  constructor(authInfo) {
    if (!isNil(authInfo)) {
      const { id, role, token, accessToken, loggedInAt } = authInfo;
      this.accessToken = token || accessToken;
      this.expiresIn = 63072000;
      this.loggedInAt = loggedInAt || moment().format();
      this.id = id;
      this.role = role;
    }
  }

  isValid = () =>
    moment() < moment(this.loggedInAt).add(this.expiresIn, 'seconds');
}

export default AuthInfo;
