/* eslint-disable react/no-array-index-key */
import React, { memo } from 'react';
import { PaginationItem, PaginationLink, Pagination, Row } from 'reactstrap';
import useHooks from './hook';
import './styles/style.scss';

const TablePagination = props => {
  const { states, handlers } = useHooks(props);
  const { totalPages, pageActive } = states;
  const { handleChangePage } = handlers;

  const renderItems = total => {
    const elements = [];
    for (let i = 0; i < total; i += 1) {
      elements.push(
        <PaginationItem active={pageActive === i + 1}>
          <PaginationLink onClick={() => handleChangePage(i + 1)}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return elements;
  };

  if (totalPages === 0) return null;
  return (
    <Row className="table-pagination">
      <Pagination className="ml-auto">
        <PaginationItem disabled={pageActive === 1}>
          <PaginationLink
            previous
            onClick={() => handleChangePage(pageActive - 1)}
          />
        </PaginationItem>
        {renderItems(totalPages)}
        <PaginationItem disabled={pageActive === totalPages}>
          <PaginationLink
            next
            onClick={() => handleChangePage(pageActive + 1)}
          />
        </PaginationItem>
      </Pagination>
    </Row>
  );
};

export default memo(TablePagination);
