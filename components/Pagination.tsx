interface PaginationProps {
  currentPage: number
  totalPages: number
  totalResults: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, totalResults, onPageChange }: PaginationProps) {
  return (
    <nav aria-label="Page navigation" className="my-4">
      <div className="text-center mb-2">Total Results: {totalResults}</div>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
        </li>
        {[...Array(Math.min(5, totalPages))].map((_, index) => {
          const pageNumber = currentPage - 2 + index
          if (pageNumber > 0 && pageNumber <= totalPages) {
            return (
              <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? "active" : ""}`}>
                <button className="page-link" onClick={() => onPageChange(pageNumber)}>
                  {pageNumber}
                </button>
              </li>
            )
          }
          return null
        })}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

