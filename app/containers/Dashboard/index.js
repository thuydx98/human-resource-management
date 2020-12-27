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
  const { states } = useHooks();
  const { leaves, tasks, getTaskState, monday } = states;

  const annualLeaves = leaves.filter(
    item => item.type === 'ANNUAL' && item.status !== 'CANCEL',
  );

  const unPaidLeaves = leaves.filter(
    item => item.type === 'NON_PAID' && item.status !== 'CANCEL',
  );

  return (
    <div className="content">
      <WeeklyTimeSheet monday={monday} tasks={tasks} loadStatus={getTaskState} />
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
                onClick={() => history.push('/leave')}
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
