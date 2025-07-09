import { Component } from 'react';
import './styles.css';

class Pagination extends Component {
  getPageRange() {
    const { currentPage, filteredCommentsLength, pageSize } = this.props;
    const start = Math.min(filteredCommentsLength, (currentPage - 1) * pageSize + 1);
    const end = Math.min(filteredCommentsLength, currentPage * pageSize);
    return { start, end };
  }

  render() {
    const {
      currentPage,
      totalPages,
      onPageChange,
      filteredCommentsLength,
      pageSize,
      onPageSizeChange
    } = this.props;

    const { start, end } = this.getPageRange();

    return (
      <div className="pagination-container">
        <div className="pagination-info">
          {start}-{end} of {filteredCommentsLength} items
        </div>

        <div className="pagination-buttons">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            &lt;
          </button>

          {totalPages > 1 && (
            <>
              {currentPage > 1 && (
                <button
                  onClick={() => onPageChange(1)}
                  className="pagination-button"
                >
                  1
                </button>
              )}
              <button
                className="pagination-button active"
              >
                {currentPage}
              </button>
              {currentPage < totalPages && (
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  className="pagination-button"
                >
                  {currentPage + 1}
                </button>
              )}
            </>
          )}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            &gt;
          </button>

          <select
            className="page-size-select"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} / Page
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default Pagination;
