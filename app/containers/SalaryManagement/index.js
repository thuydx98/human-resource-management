import React from 'react';
import { Button, CardTitle, Table, UncontrolledTooltip } from 'reactstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function SalaryManagement() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();

  return (
    <div className="content">
      {/* <CardTitle tag="h2">
        Salary Management
        <Button
          className="ml-3"
          color="info"
          size="sm"
          // onClick={() => toggleAddModal(true)}
        >
          + Add
        </Button>
      </CardTitle>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Total members</th>
            <th>Created date</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Neumann</td>
            <td>Top department of company</td>
            <th>100</th>
            <th>Aug 12 2018</th>
            <td className="text-right">
              <Button color="link" id="tooltip636901683" title="" type="button">
                <i className="tim-icons icon-pencil" />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target="tooltip636901683"
                placement="right"
              >
                Edit department
              </UncontrolledTooltip>
            </td>
          </tr>
        </tbody>
      </Table> */}
    </div>
  );
}
