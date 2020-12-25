import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import moment from 'moment';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AuthUtils from 'utils/authentication';
import { useParams } from 'react-router-dom';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';
import FeedbackModal from './FeedbackModal';

export default function ReportingLine(props) {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks(props);
  const { feedBacks, isOpenModal, user } = states;
  const { toggleModal, updateList } = handlers;
  const params = useParams();
  const { role } = AuthUtils.getAuthInfo();
  const isAllow = role === 'Manager' && params.userId;

  return (
    <>
      <Card>
        {isAllow && (
          <CardHeader>
            <h4 className="description mb-0">
              Feed back
              <Button
                size="sm"
                color="info"
                className="btn-simple float-right m-0"
                onClick={() => toggleModal(true)}
              >
                <i className="tim-icons icon-simple-add" /> New
              </Button>
            </h4>
          </CardHeader>
        )}
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Report date</th>
                <th>Reporter</th>
                <th>Feedback</th>
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
                  <td>
                    <span id={`tooltip${item.id}`}>{item.content}</span>
                    <UncontrolledTooltip
                      delay={0}
                      target={`tooltip${item.id}`}
                      placement="right"
                    >
                      {item.content}
                    </UncontrolledTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <FeedbackModal
        isOpen={isOpenModal}
        toggleModal={toggleModal}
        user={user}
        updateList={updateList}
      />
    </>
  );
}
