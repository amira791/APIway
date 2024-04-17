import React from 'react';

const CustomPagination = ({ currentPage, totalPages, handlePageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}>
          <button onClick={() => handlePageChange(i)} className="px-3 py-2 hover:bg-blue-200 focus:outline-none">
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <nav className="flex justify-center" aria-label="Pagination">
      <ul className="flex flex-wrap items-center">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-white text-blue-500 border border-blue-500 rounded-md mr-2 hover:bg-blue-200 focus:outline-none"
          >
            Prev
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-white text-blue-500 border border-blue-500 rounded-md ml-2 hover:bg-blue-200 focus:outline-none"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default CustomPagination;
