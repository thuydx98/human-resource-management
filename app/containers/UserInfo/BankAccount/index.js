import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function BankAccount(props) {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states } = useHooks(props);
  const { bankAccounts } = states;

  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="description">Bank account</h4>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Bank name</th>
                <th>Account number</th>
                <th>Account name</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bankAccounts &&
                bankAccounts.map(item => (
                  <tr>
                    <td>{item.bankName}</td>
                    <td>{item.accountNumber}</td>
                    <td>{item.accountName}</td>
                    <td className="text-right">
                      <Button
                        color="link"
                        id="tooltip636901683"
                        title=""
                        type="button"
                      >
                        <i className="tim-icons icon-pencil" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        target="tooltip636901683"
                        placement="right"
                      >
                        Edit Account
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
