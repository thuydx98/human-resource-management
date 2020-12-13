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
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import WeeklyTimeSheet from 'containers/WeeklyTimeSheet/Loadable';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function Dashboard() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();

  return (
    <div className="content">
      <WeeklyTimeSheet />
      <Row>
        <Col md={5}>
          <Card>
            <CardHeader>
              <h4 className="description mb-0">Personal detail</h4>
            </CardHeader>
            <CardBody>
              <CardText>
                Annual leave <span className="float-right">5/5</span>
              </CardText>
              <CardText>
                Unpaid leave <span className="float-right">30/30</span>
              </CardText>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                color="info"
                className="btn-sm float-right ml-2"
                // onClick={onSubmit}
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
