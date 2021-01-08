import React, { memo } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import './styles/style.scss';

const UserCard = props => {
  const { user, color } = props;
  return (
    <>
      <Button color={color} className="animation-on-hover border position">
        <div className="d-flex">
          <div className="user-avatar">
            <img
              alt=""
              src={
                get('avatar', user) || require('assets/img/default-avatar.png')
              }
            />
          </div>
          <div className="mx-2">
            <div className="user-name">
              {get('firstname', user)
                ? `${get('firstname', user)} ${get('lastname', user)}`
                : '-'}
            </div>
            <div className="user-title">{get('permission', user)}</div>
          </div>
        </div>
        {}
      </Button>
    </>
  );
};

UserCard.propTypes = {
  user: PropTypes.any,
  color: PropTypes.string,
};

export default memo(UserCard);
