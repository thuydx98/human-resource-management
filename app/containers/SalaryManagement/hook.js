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
  selectSendReportState,
} from './selectors';

export const useHooks = () => {
  const notificationRef = useRef();
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM'));
  const salaries = useSelector(selectListSalaryData);
  const saveSalaryListState = useSelector(selectSaveSalaryListState);
  const getListSalaryState = useSelector(selectListSalaryState);
  const sendReportState = useSelector(selectSendReportState);

  const {
    setSalaryList,
    getSalaryList,
    saveSalaryList,
    exportListSalary,
    sendReport,
    resetSendReport,
  } = useActions(
    {
      setSalaryList: actions.setSalaryList,
      getSalaryList: actions.getSalaryList,
      saveSalaryList: actions.saveListSalary,
      exportListSalary: actions.exportListSalary,
      sendReport: actions.sendReport,
      resetSendReport: actions.resetSendReport,
    },
    [actions],
  );

  useEffect(() => {
    getSalaryList(selectedDate);
    return undefined;
  }, [selectedDate]);

  useEffect(() => {
    if (sendReportState === ACTION_STATUS.SUCCESS) {
      notificationRef.current.notifySuccess('Send report to employees succeed');
    } else if (sendReportState === ACTION_STATUS.FAILED) {
      notificationRef.current.notifyError('Send report to employees failed');
    }

    return () => resetSendReport();
  }, [sendReportState]);

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

  const handleExportListSalary = useCallback(() => {
    if (window.confirm('Are you sure want to export this monthly salary?')) {
      exportListSalary(salaries);
    }
  }, [salaries]);

  const handleSendReport = useCallback(() => {
    if (window.confirm('Are you sure want to send reports for this month?')) {
      sendReport(salaries);
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
      handleExportListSalary,
      handleSendReport,
    },
  };
};

export default useHooks;

export const formatCurrency = input =>
  `${String(input.toFixed(0)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} đ`;
