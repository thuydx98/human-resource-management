import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import get from 'lodash/fp/get';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function ProjectInfo() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { user, isSubmitted } = states;
  const { onSubmit, setUser } = handlers;

  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="description">Project information</h4>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Start from</th>
                <th>To</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NetLove</td>
                <td>MCV</td>
                <td>Aug 11 2020</td>
                <td>Aug 11 2020</td>
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
                    Edit
                  </UncontrolledTooltip>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}
