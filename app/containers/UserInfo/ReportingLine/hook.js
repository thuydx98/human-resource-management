import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
// import { selectContractListData } from './selectors';

export const useHooks = () => {
  return {
    states: {},
    handlers: {},
  };
};

export default useHooks;
