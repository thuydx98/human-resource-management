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
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';
import { ContractModal } from './ContractModal';

export default function Contract(props) {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks(props);
  const { contracts, isOpenModal, user, selectedContract } = states;
  const { toggleModal, updateList, handleOpenModal } = handlers;

  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="description m-0">
            Contract
            <Button
              size="sm"
              color="info"
              className="btn-simple float-right m-0"
              onClick={() => handleOpenModal()}
            >
              <i className="tim-icons icon-simple-add" /> New
            </Button>
          </h4>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Contract No</th>
                <th>Joining Date</th>
                <th>Probation Status</th>
                <th>End Probation Date</th>
                <th>Start</th>
                <th>End</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map(item => (
                <tr>
                  <td>{item.contractNo}</td>
                  <td>{moment(item.joinDate).format('MMM DD YYYY')}</td>
                  <td>{item.probationStatus}</td>
                  <td>
                    {item.endDate
                      ? moment(item.endProbationDate).format('MMM DD YYYY')
                      : '-'}
                  </td>
                  <td>
                    {item.startDate
                      ? moment(item.startDate).format('MMM DD YYYY')
                      : '-'}
                  </td>
                  <td>
                    {item.endDate
                      ? moment(item.endDate).format('MMM DD YYYY')
                      : '-'}
                  </td>
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
                      Edit Contract
                    </UncontrolledTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <ContractModal
        isOpen={isOpenModal}
        contract={selectedContract}
        toggleModal={toggleModal}
        user={user}
        updateList={updateList}
      />
    </>
  );
}
