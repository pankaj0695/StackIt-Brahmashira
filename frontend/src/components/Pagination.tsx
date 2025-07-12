import React from 'react';

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ current, total, onPageChange }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
      >
        {'<'}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`page-btn${page === current ? ' active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="page-btn"
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;