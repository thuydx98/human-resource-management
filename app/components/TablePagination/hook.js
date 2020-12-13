import { useEffect, useState } from 'react';

export const useHooks = props => {
  const [totalPages, setTotalPages] = useState(0);
  const [pageActive, setPageActive] = useState(1);
  const { setPageIndex } = props;

  useEffect(() => {
    const { total = 0, pageSize = 10, pageIndex = 1 } = props;
    setPageActive(pageIndex);
    setTotalPages(
      total % pageSize === 0
        ? Math.floor(total / pageSize)
        : Math.floor(total / pageSize + 1),
    );
  }, [props]);

  return {
    states: {
      totalPages,
      pageActive,
    },
    handlers: {
      handleChangePage: setPageIndex,
    },
  };
};

export default useHooks;
