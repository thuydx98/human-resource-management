import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
  FormFeedback,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import moment from 'moment';
import get from 'lodash/fp/get';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function ReportingLine(props) {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks(props);
  const { feedBacks } = states;

  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="description">Reporting line</h4>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Report date</th>
                <th>Full name</th>
                <th>Feedback</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedBacks.map(item => (
                <tr>
                  <td>{moment(item.reviewDate).format('MMM DD YYYY')}</td>
                  <td>
                    {item.firstname
                      ? `${item.firstname} ${item.lastname}`
                      : '-'}
                  </td>
                  <td>{item.content}</td>
                  <td className="text-right">
                    <Button
                      color="link"
                      id="tooltip636901683"
                      title=""
                      type="button"
                    >
                      <i className="tim-icons icon-bulb-63" />
                    </Button>
                    <UncontrolledTooltip
                      delay={0}
                      target="tooltip636901683"
                      placement="right"
                    >
                      View comment
                    </UncontrolledTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}
