import React from 'react';
import { Input } from 'reactstrap';
import moment from 'moment';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import WeeklyTimeSheet from 'containers/WeeklyTimeSheet';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function TimeSheet() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const {
    selectedMonth,
    mondays,
    tasks,
    loadStatus,
    saveTaskStates,
    submitTaskStates,
    assignees,
  } = states;
  const {
    setSelectedMonth,
    handleSave,
    handleSubmit,
    handleResetState,
  } = handlers;

  return (
    <div className="content">
      <Input
        type="month"
        value={selectedMonth.format('YYYY-MM')}
        className="float-right mb-3 w-25"
        onChange={e => setSelectedMonth(moment(e.target.value))}
      />

      {mondays &&
        mondays.map((item, index) => (
          <WeeklyTimeSheet
            key={item.format('YYYY-MM-DD')}
            monday={item}
            data={tasks[index]}
            loadStatus={loadStatus}
            onSave={handleSave}
            onSubmit={handleSubmit}
            index={index}
            saveStatus={saveTaskStates[index].status}
            submitStatus={submitTaskStates[index].status}
            resetState={() => handleResetState(index)}
            assignees={assignees}
          />
        ))}
    </div>
  );
}
