/* eslint-disable no-alert */
import { useCallback, useEffect, useRef, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from './slice';
import {
  selectListSalaryData,
  selectSaveSalaryListState,
  selectListSalaryState,
} from './selectors';

export const useHooks = () => {
  const notificationRef = useRef();
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM'));
  const salaries = useSelector(selectListSalaryData);
  const saveSalaryListState = useSelector(selectSaveSalaryListState);
  const getListSalaryState = useSelector(selectListSalaryState);

  const { setSalaryList, getSalaryList, saveSalaryList } = useActions(
    {
      setSalaryList: actions.setSalaryList,
      getSalaryList: actions.getSalaryList,
      saveSalaryList: actions.saveListSalary,
    },
    [actions],
  );

  useEffect(() => {
    getSalaryList(selectedDate);
    return undefined;
  }, [selectedDate]);

  useEffect(() => {
    switch (saveSalaryListState) {
      case ACTION_STATUS.SUCCESS:
        setSalaryList(salaries.map(item => ({ ...item, submitted: true })));
        notificationRef.current.notifySuccess('Save salaries succeeded');
        break;
      case ACTION_STATUS.FAILED:
        notificationRef.current.notifyError('Save salaries failed');
        break;
      default:
        break;
    }
  }, [setSalaryList, salaries, saveSalaryListState]);

  const handleSaveListSalary = useCallback(() => {
    if (window.confirm('Are you sure want to submit this monthly salary?')) {
      saveSalaryList(salaries);
    }
  }, [salaries]);

  return {
    states: {
      selectedDate,
      salaries,
      saveSalaryListState,
      notificationRef,
      getListSalaryState,
    },
    handlers: {
      setSelectedDate,
      handleSaveListSalary,
    },
  };
};

export default useHooks;

export const calculateTax = income => {
  const taxAmount = income - 11000000;
  if (taxAmount <= 0) return 0;

  let total = 0;
  if (taxAmount < 5000000) return taxAmount * 0.05;
  total += (5000000 - 0) * 0.05;

  if (taxAmount < 10000000) return total + (taxAmount - 5000000) * 0.1;
  total += (10000000 - 5000000) * 0.1;

  if (taxAmount < 18000000) return total + (taxAmount - 10000000) * 0.15;
  total += (18000000 - 10000000) * 0.15;

  if (taxAmount < 32000000) return total + (taxAmount - 18000000) * 0.2;
  total += (32000000 - 18000000) * 0.2;

  if (taxAmount < 52000000) return total + (taxAmount - 32000000) * 0.25;
  total += (52000000 - 32000000) * 0.25;

  if (taxAmount < 80000000) return total + (taxAmount - 52000000) * 0.3;
  total += (80000000 - 52000000) * 0.3;

  return total + (taxAmount - 80000000) * 0.35;
};

export const formatCurrency = input =>
  `${String(input.toFixed(0)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} đ`;
