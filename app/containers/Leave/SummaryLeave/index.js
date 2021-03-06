import React from 'react';
import { Card, CardBody, Table } from 'reactstrap';
import moment from 'moment';
import { getTotalWorkDays } from 'utils/datetime';
import useHooks from './hook';

export default function SummaryLeave() {
  const { states } = useHooks();
  const { leaves } = states;

  const now = moment();
  const annualLeaves = leaves.filter(
    item => item.type === 'ANNUAL' && item.status !== 'CANCEL',
  );

  const unPaidLeaves = leaves.filter(
    item => item.type === 'NON_PAID' && item.status !== 'CANCEL',
  );

  return (
    <>
      <Card>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Leave type</th>
                <th className="text-right">Total (days)</th>
                <th className="text-right">Taken (days)</th>
                <th className="text-right">Planned (days)</th>
                <th className="text-right">Remaining (days)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Annual Leave</td>
                <td className="text-right">12</td>
                <td className="text-right">
                  {annualLeaves
                    .filter(item => moment(item.startDate) <= now)
                    .map(item => getTotalWorkDays(item.startDate, item.endDate))
                    .reduce((a, b) => a + b, 0)}
                </td>
                <td className="text-right">
                  {annualLeaves
                    .filter(item => moment(item.startDate) > now)
                    .map(item => getTotalWorkDays(item.startDate, item.endDate))
                    .reduce((a, b) => a + b, 0)}
                </td>
                <td className="text-right">
                  {12 -
                    annualLeaves
                      .map(item =>
                        getTotalWorkDays(item.startDate, item.endDate),
                      )
                      .reduce((a, b) => a + b, 0)}
                </td>
              </tr>
              <tr>
                <td>Non-paid Leave</td>
                <td className="text-right">30</td>
                <td className="text-right">
                  {unPaidLeaves
                    .filter(item => moment(item.startDate) <= now)
                    .map(item => getTotalWorkDays(item.startDate, item.endDate))
                    .reduce((a, b) => a + b, 0)}
                </td>
                <td className="text-right">
                  {unPaidLeaves
                    .filter(item => moment(item.startDate) > now)
                    .map(item => getTotalWorkDays(item.startDate, item.endDate))
                    .reduce((a, b) => a + b, 0)}
                </td>
                <td className="text-right">
                  {30 -
                    unPaidLeaves
                      .map(item =>
                        getTotalWorkDays(item.startDate, item.endDate),
                      )
                      .reduce((a, b) => a + b, 0)}
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}
