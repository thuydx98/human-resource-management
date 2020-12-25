import React from 'react';
import { Input, Button, Row, Col } from 'reactstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Seat from 'components/Seat';
import AuthUtils from 'utils/authentication';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';
import SeatModal from './SeatModal';

export default function SeatingPlan() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { seats, selectedFloor, isOpenModal, selectedSeat } = states;
  const {
    setSelectedFloor,
    toggleModal,
    updateList,
    handleOpenModal,
  } = handlers;

  const { role } = AuthUtils.getAuthInfo();
  const selectedSeats = seats
    ? seats.filter(item => item.floor === selectedFloor)
    : [];

  return (
    <div className="content">
      <Row>
        <Col md={3}>
          <Input
            placeholder="Choose..."
            type="select"
            className="ml-3"
            onChange={e => setSelectedFloor(e.target.value)}
          >
            <option value="1">Floor 1</option>
            <option value="2">Floor 2</option>
            <option value="3">Floor 3</option>
            <option value="4">Floor 4</option>
          </Input>
        </Col>
        {role === 'Manager' && (
          <Col>
            <Button
              size="sm"
              color="info"
              className="btn-simple float-right"
              onClick={() => handleOpenModal()}
            >
              <i className="tim-icons icon-simple-add" /> New
            </Button>
          </Col>
        )}
      </Row>

      {selectedSeats.map(item => (
        <Seat
          key={item.id}
          position={item.seat}
          id={item.id}
          employeeId={item.employeeId}
          fullName={
            item.firstname
              ? `${item.firstname} ${item.lastname}`
              : item.employee_code
          }
          department={item.department || '-'}
          onClick={() => handleOpenModal(item)}
        />
      ))}

      <SeatModal
        isOpen={isOpenModal}
        seat={selectedSeat}
        toggleModal={toggleModal}
        updateList={updateList}
        selectedFloor={selectedFloor}
      />
    </div>
  );
}
