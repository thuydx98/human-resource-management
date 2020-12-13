import React, { memo } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import './styles/style.scss';

const Seat = props => {
  const { id, department, fullName, position } = props;
  return (
    <>
      <Button
        color={fullName ? 'danger' : 'success'}
        id={`tooltip${id}`}
        className="animation-on-hover border seat"
      >
        {position}
      </Button>
      {fullName && (
        <UncontrolledTooltip
          delay={0}
          target={`tooltip${id}`}
          placement="right"
        >
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
};

export default memo(Seat);
