import { useCallback, useEffect, useState } from 'react';

export const useHooks = props => {
  const { user, updateUser } = props;
  const [projects, setProjects] = useState([]);
  const [isOpenModal, toggleModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  useEffect(() => {
    const tempUser = { ...user };
    setProjects(tempUser.projects);
  }, [user]);

  const handleOpenModal = useCallback(
    (project = {}) => {
      setSelectedProject(project);
      toggleModal(true);
    },
    [setSelectedProject, toggleModal],
  );

  const updateList = useCallback(
    project => {
      let newList = [];
      if (selectedProject.id) {
        newList = projects.map(item =>
          item.id === selectedProject.id ? project : item,
        );
      } else {
        newList = [...projects, project];
      }

      updateUser({ ...user, projects: newList });
    },
    [selectedProject, projects],
  );

  return {
    states: { projects, selectedProject, isOpenModal, user },
    handlers: { handleOpenModal, toggleModal, updateList },
  };
};

export default useHooks;
