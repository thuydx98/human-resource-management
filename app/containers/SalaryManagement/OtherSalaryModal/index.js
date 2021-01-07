import React, { memo } from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Notification from 'components/Notification';
import { ACTION_STATUS } from 'utils/constants';
import { v4 as uuid } from 'uuid';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  FormFeedback,
  Label,
  Input,
  Table,
} from 'reactstrap';
import SubmitButton from 'components/Buttons/SubmitButton';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export const OtherSalaryModal = props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { states, handlers } = useHooks(props);
  const {
    isOpenModal,
    others,
    notificationRef,
    updateState,
    isSubmitted,
  } = states;
  const { handleCloseModal, setOthers, onSubmit } = handlers;

  return (
    <>
      <Notification ref={notificationRef} />
      <Modal
        isOpen={isOpenModal}
        toggle={handleCloseModal}
        className="card"
        size="lg"
      >
        <div className="modal-header">
          <h4 className="modal-title">Other salaries</h4>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-hidden="true"
            onClick={handleCloseModal}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th width="120">Income</th>
                <th width="250">Amount</th>
                <th>Description</th>
                {/* <th width="20" /> */}
              </tr>
            </thead>
            <tbody>
              {others &&
                others.length > 0 &&
                others.map(item => (
                  <tr>
                    <td>
                      <Label check>
                        <Input
                          type="select"
                          value={item.isIncome.toString()}
                          disabled={item.description && item.description.includes('OT')}
                          onChange={e =>
                            setOthers(
                              others.map(other =>
                                other.id === item.id
                                  ? {
                                      ...item,
                                      isIncome: e.target.value === 'true',
                                    }
                                  : other,
                              ),
                            )
                          }
                        >
                          <option value="true">In come</option>
                          <option value="false">Out come</option>
                        </Input>
                      </Label>
                    </td>
                    <td>
                      <Input
                        type="number"
                        value={item.amount ? item.amount.toFixed(0) : undefined}
                        invalid={isSubmitted && !item.amount}
                        disabled={item.description && item.description.includes('OT')}
                        onChange={e =>
                          setOthers(
                            others.map(other =>
                              other.id === item.id
                                ? {
                                    ...item,
                                    amount: +e.target.value,
                                  }
                                : other,
                            ),
                          )
                        }
                      />
                    </td>
                    <td>
                      <Input
                        value={item.description}
                        invalid={isSubmitted && !item.description}
                        disabled={item.description && item.description.includes('OT')}
                        onChange={e =>
                          setOthers(
                            others.map(other =>
                              other.id === item.id
                                ? {
                                    ...item,
                                    description: e.target.value,
                                  }
                                : other,
                            ),
                          )
                        }
                      />
                    </td>
                    {/* <td>
                      <Button
                        color="link"
                        type="button"
                        className="px-0"
                        // onClick={() => handleDeleteTask(item.id)}
                      >
                        <i className="tim-icons icon-trash-simple text-info p-0 pt-2" />
                      </Button>
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            color="success"
            className="btn-simple mt-1"
            onClick={() =>
              setOthers([
                ...others,
                {
                  id: uuid(),
                  employeeId: others[0].employeeId,
                  time: others[0].time,
                  isIncome: true,
                },
              ])
            }
          >
            + New
          </Button>
          <SubmitButton
            color="info"
            onClick={onSubmit}
            disabled={updateState === ACTION_STATUS.PENDING}
            loading={updateState === ACTION_STATUS.PENDING}
          >
            Save
          </SubmitButton>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default memo(OtherSalaryModal);
