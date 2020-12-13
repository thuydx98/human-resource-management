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

  return (
    <div className="content">
      <Input placeholder="Choose..." type="select" className="w-25 ml-3">
        <option value="1">Floor 1</option>
        <option value="2">Floor 2</option>
        <option value="3">Floor 3</option>
        <option value="4">Floor 4</option>
        <option value="5">Floor 5</option>
        <option value="6">Floor 6</option>
      </Input>

      <Seat
        position="F1.1"
        id="636901683"
        fullName="Employee name"
        department="Department"
      />
      <Seat
        position="F1.2"
        id="636901683"
        fullName="Employee name"
        department="Department"
      />
      <Seat position="F1.3" />
      <Seat
        position="F1.4"
        id="636901683"
        fullName="Employee name"
        department="Department"
      />
      <Seat
        position="F1.5"
        id="636901683"
        fullName="Employee name"
        department="Department"
      />
      <Seat
        position="F1.6"
        id="636901683"
        fullName="Employee name"
        department="Department"
      />
      <Seat
        position="F1.7"
        id="636901683"
        fullName="Employee name"
        department="Department"
      />
      <Seat position="F1.8" />
      <Seat
        position="F1.9"
        id="636901683"
        fullName="Employee name"
        department="Department"
      />
    </div>
  );
}
