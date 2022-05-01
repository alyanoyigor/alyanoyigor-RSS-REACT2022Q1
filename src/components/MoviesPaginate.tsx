import React from 'react';
import ReactPaginate from 'react-paginate';

type MoviesPaginateProps = {
  totalCount: number;
  pageNum: number;
  handlePaginate: (data: { selected: number }) => void;
};

export const MoviesPaginate = ({ totalCount, pageNum, handlePaginate }: MoviesPaginateProps) => {
  return totalCount ? (
    <ReactPaginate
      nextLabel=">>"
      previousLabel="<<"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={4}
      pageCount={totalCount > 500 ? 500 : totalCount}
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
