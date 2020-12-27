import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';

export const useHooks = (props) => {
  return {
    states: {},
    handlers: {},
  };
};

export default useHooks;
