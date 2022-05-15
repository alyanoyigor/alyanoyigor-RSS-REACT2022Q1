import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { State } from '../types/types';

type MoviesPaginateProps = {
  pageNum: number;
  handlePaginate: (data: { selected: number }) => void;
};

export const MoviesPaginate = ({ pageNum, handlePaginate }: MoviesPaginateProps) => {
  const { totalPages } = useSelector((state: { appState: State }) => state.appState);

  return totalPages ? (
    <ReactPaginate
      nextLabel=">>"
      previousLabel="<<"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={4}
      pageCount={totalPages > 500 ? 500 : totalPages}
      forcePage={pageNum}
      onPageChange={handlePaginate}
      containerClassName="pagination justify-content-center"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      activeClassName="active"
    />
  ) : null;
};
