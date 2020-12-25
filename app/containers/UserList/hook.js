import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { selectUserListData } from './selectors';

export const useHooks = () => {
  const [isOpenAddModal, toggleAddModal] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [search, setSearch] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const userList = useSelector(selectUserListData);
  const { getUserList } = useActions({ getUserList: actions.getUserList }, [
    actions,
  ]);

  useEffect(() => {
    getUserList();
    return undefined;
  }, []);

  const handleSearch = useCallback(
    key => {
      setSearch(key);
      setPageIndex(1);
      if (key) {
        setSearchResult(
          userList.filter(
            item =>
              `${item.firstname} ${item.lastname}`
                .toLowerCase()
                .includes(key.toLowerCase()) ||
              item.email.startsWith(key) ||
              item.employee_code.toString().startsWith(key) ||
              `0${item.phone}`.startsWith(key),
          ),
        );
      }
    },
    [userList],
  );

  return {
    states: {
      userList,
      isOpenAddModal,
      pageIndex,
      searchResult,
      search,
    },
    handlers: {
      toggleAddModal,
      getUserList,
      setPageIndex,
      handleSearch,
    },
  };
};

export default useHooks;
