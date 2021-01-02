import React, { memo } from 'react';
import { Spinner } from 'reactstrap';
import './styles/style.scss';

const Loading = () => (
  <div id="loading">
    <Spinner />
  </div>
);

export default memo(Loading);
