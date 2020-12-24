import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useActions from 'utils/hooks/useActions';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from '../slice';
import {
  selectSaveProjectInfoState,
  selectProjectList,
  selectSaveProjectInfoData,
} from '../selectors';

export const useHooks = props => {
  const notificationRef = useRef();
  const { project, isOpen, toggleModal, user, updateList } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [payload, setPayload] = useState({});

  const saveProjectState = useSelector(selectSaveProjectInfoState);
  const saveProjectData = useSelector(selectSaveProjectInfoData);
  const projectList = useSelector(selectProjectList);

  const { saveProject, getProjectList, resetState } = useActions(
    {
      saveProject: actions.saveProjectInfo,
      getProjectList: actions.getProjectList,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => {
    if (isOpen && projectList.length === 0) {
      getProjectList();
    }
  }, [isOpen]);
  useEffect(() => setPayload(project || {}), [project]);
  useEffect(() => setIsOpenModal(isOpen), [isOpen]);
  useEffect(() => {
    if (saveProjectState === ACTION_STATUS.SUCCESS) {
      const projectInfo = projectList.find(
        item => item.id === saveProjectData.projectId,
      );
      updateList({
        ...saveProjectData,
        project: projectInfo.name,
        client: projectInfo.client,
      });
      handleCloseModal();
      notificationRef.current.notifySuccess(
        'Save project information succeeded',
      );
    }
  }, [saveProjectData, saveProjectState, projectList]);

  const handleCloseModal = useCallback(() => {
    toggleModal(false);
    setIsSubmitted(false);
    resetState();
  }, [toggleModal]);

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      setIsSubmitted(true);
      if (payload.projectId && payload.startDate && payload.endDate) {
        saveProject({ ...payload, userId: user.id });
      }
    },
    [payload, user],
  );

  return {
    states: {
      isOpenModal,
      payload,
      notificationRef,
      isSubmitted,
      projectList,
    },
    handlers: {
      handleCloseModal,
      onSubmit,
      setPayload,
    },
  };
};

export default useHooks;
