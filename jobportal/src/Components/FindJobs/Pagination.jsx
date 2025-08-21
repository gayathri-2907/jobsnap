import React from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i);

    return (
        <div className="pagination">
            <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                Prev
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                >
                    {page + 1}
                </button>
            ))}
            <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
