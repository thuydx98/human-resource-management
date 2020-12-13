import React from 'react';
import { Button, CardTitle, Input, Table } from 'reactstrap';
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

  const items = [1, 2, 3, 4, 5];

  return (
    <div className="content">
      <Input
        type="month"
        defaultValue={moment().format('YYYY-MM')}
        className="float-right mb-3 w-25"
      />

      {items.map(() => (
        <WeeklyTimeSheet />
      ))}
    </div>
  );
}
