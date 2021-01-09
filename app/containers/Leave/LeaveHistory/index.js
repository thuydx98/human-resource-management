import React from 'react';
import { Button, Card, CardBody, Table, UncontrolledTooltip } from 'reactstrap';
import moment from 'moment';
import Notification from 'components/Notification';
import useHooks from './hook';

export default function LeaveHistory() {
  const { states, handlers } = useHooks();
  const { leaves, notificationRef } = states;
  const { handleCancelRequest } = handlers;

  const now = moment();

  return (
    <>
      <Notification ref={notificationRef} />
      <Card>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Request</th>
                <th>Created date</th>
                <th>Leave type</th>
                <th>Status</th>
                <th>Reason</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(item => {
                const status = moment(item.date) <= now ? 'Taken' : 'Planned';
                return (
                  <tr key={item.id}>
                    <td>
                      {moment(item.startDate).format('MMM DD YYYY')}
                      {item.startDate !== item.endDate &&
                        ` - ${moment(item.endDate).format('MMM DD YYYY')}`}
                    </td>
                    <td>{moment(item.createdDate).format('MMM DD YYYY')}</td>
                    <td>{item.type === 'ANNUAL' ? 'Annual' : 'Non-paid'}</td>
                    <td>{item.status === 'CANCEL' ? 'Cancelled' : status}</td>
                    <td>{item.reason}</td>
                    <td className="text-right">
                      {moment(item.startDate) >= now &&
                        item.status !== 'CANCEL' && (
                          <>
                            <Button
                              color="link"
                              className="text-muted"
                              id={`tooltip${item.id}`}
                              onClick={() => handleCancelRequest(item.id)}
                            >
                              <i className="tim-icons icon-simple-remove" />
                            </Button>
                            <UncontrolledTooltip target={`tooltip${item.id}`}>
                              Cancel
                            </UncontrolledTooltip>
                          </>
                        )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}
