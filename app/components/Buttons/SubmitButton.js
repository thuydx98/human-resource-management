import React from 'react';
import { Button, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

export default function SubmitButton(props) {
  const { onClick, loading, className, disabled, children, btn, color } = props;
  return (
    <Button
      size="sm"
      color={color || 'info'}
      className={`${btn || 'btn-simple'} d-flex ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading && <Spinner size="sm" color="info" className="mr-2" />}
      <span>{children}</span>
    </Button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  btn: PropTypes.string,
  color: PropTypes.string,
};
