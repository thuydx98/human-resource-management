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
import { ProjectInfoModal } from './ProjectInfoModal';

export default function ProjectInfo(props) {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks(props);
  const { projects, isOpenModal, selectedProject, user } = states;
  const { updateList, toggleModal, handleOpenModal } = handlers;

  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="description mb-0">
            Project information
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
                <th>Project</th>
                <th>Client</th>
                <th>Start from</th>
                <th>To</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects &&
                projects.map(item => (
                  <tr>
                    <td>{item.project}</td>
                    <td>{item.client || '-'}</td>
                    <td>
                      {item.startDate
                        ? moment(item.startDate).format('MMMM DD YYYY')
                        : '-'}
                    </td>
                    <td>
                      {item.endDate
                        ? moment(item.endDate).format('MMMM DD YYYY')
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
                        Edit
                      </UncontrolledTooltip>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <ProjectInfoModal
        isOpen={isOpenModal}
        project={selectedProject}
        toggleModal={toggleModal}
        user={user}
        updateList={updateList}
      />
    </>
  );
}
