import React from 'react';
import {
  Button,
  CardTitle,
  Input,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import moment from 'moment';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Seat from 'components/Seat';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function SeatingPlan() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { seats, selectedFloor } = states;
  const { setSelectedFloor } = handlers;
  const selectedSeats = seats
    ? seats.filter(item => item.floor === selectedFloor)
    : [];

  return (
    <div className="content">
      <Input
        placeholder="Choose..."
        type="select"
        className="w-25 ml-3"
        onChange={e => setSelectedFloor(e.target.value)}
      >
        <option value="1">Floor 1</option>
        <option value="2">Floor 2</option>
        <option value="3">Floor 3</option>
        <option value="4">Floor 4</option>
      </Input>

      {selectedSeats.map(item => (
        <Seat
          key={item.id}
          position={item.seat}
          id={item.id}
          employeeId={item.employeeId}
          fullName={item.firstname ? `${item.firstname} ${item.lastname}` : '-'}
          department={item.department || '-'}
        />
      ))}
    </div>
  );
}
