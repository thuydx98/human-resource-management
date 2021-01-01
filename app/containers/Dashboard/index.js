import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Col,
  Row,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import WeeklyTimeSheet from 'containers/WeeklyTimeSheet/Loadable';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function Dashboard() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const history = useHistory();
  const { states, handlers } = useHooks();
  const {
    leaves,
    taskData,
    getTaskState,
    monday,
    saveTaskState,
    submitTaskState,
  } = states;
  const { saveTask, submitTask, resetState } = handlers;

  const annualLeaves = leaves.filter(
    item => item.type === 'ANNUAL' && item.status !== 'CANCEL',
  );

  const unPaidLeaves = leaves.filter(
    item => item.type === 'NON_PAID' && item.status !== 'CANCEL',
  );

  return (
    <div className="content">
      <WeeklyTimeSheet
        monday={monday}
        data={taskData}
        loadStatus={getTaskState}
        onSave={saveTask}
        onSubmit={submitTask}
        saveStatus={saveTaskState}
        submitStatus={submitTaskState}
        resetState={resetState}
      />
      <Row>
        <Col md={5}>
          <Card>
            <CardHeader>
              <h4 className="description mb-0">Personal detail</h4>
            </CardHeader>
            <CardBody>
              <CardText>
                Annual leave
                <span className="float-right">
                  {`${12 - annualLeaves.length}/12`}
                </span>
              </CardText>
              <CardText>
                Unpaid leave
                <span className="float-right">
                  {`${30 - unPaidLeaves.length}/30`}
                </span>
              </CardText>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                color="info"
                className="btn-sm float-right ml-2"
                onClick={() => history.push('/day-off')}
              >
                Request leave
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
