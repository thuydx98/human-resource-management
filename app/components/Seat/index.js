import React, { memo } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import AuthUtils from 'utils/authentication';
import './styles/style.scss';

const Seat = props => {
  const { id, department, fullName, position, employeeId, onClick } = props;
  const { role } = AuthUtils.getAuthInfo();
  return (
    <>
      <Button
        color={employeeId ? 'danger' : 'success'}
        id={`tooltip${id}`}
        className="animation-on-hover border seat"
        onClick={role === 'Manager' ? onClick : null}
      >
        {position}
      </Button>
      {employeeId && (
        <UncontrolledTooltip target={`tooltip${id}`} placement="right">
          <b>{department}</b> <br /> {fullName}
        </UncontrolledTooltip>
      )}
    </>
  );
};

Seat.propTypes = {
  id: PropTypes.string,
  position: PropTypes.string,
  department: PropTypes.string,
  fullName: PropTypes.string,
  employeeId: PropTypes.string,
  onClick: PropTypes.func,
};

export default memo(Seat);
