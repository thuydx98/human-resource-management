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
import { BankAccountModal } from './BankAccountModal';

export default function BankAccount(props) {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks(props);
  const { bankAccounts, isOpenModal, selectedAccount, user } = states;
  const { handleOpenModal, toggleModal, updateList } = handlers;

  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="description mb-0">
            Bank account
            <Button
              size="sm"
              color="info"
              className="btn-simple float-right m-0"
              onClick={handleOpenModal}
            >
              <i className="tim-icons icon-simple-add" /> New
            </Button>
          </h4>
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
                  <tr key={item.id}>
                    <td>{item.bankName}</td>
                    <td>{item.accountNumber}</td>
                    <td>{item.accountName}</td>
                    <td className="text-right">
                      <Button
                        color="link"
                        id={`tooltip${item.id}`}
                        title=""
                        type="button"
                        onClick={() => handleOpenModal(item)}
                      >
                        <i className="tim-icons icon-pencil" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        target={`tooltip${item.id}`}
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
      <BankAccountModal
        isOpen={isOpenModal}
        bankAccount={selectedAccount}
        toggleModal={toggleModal}
        user={user}
        updateList={updateList}
      />
    </>
  );
}
