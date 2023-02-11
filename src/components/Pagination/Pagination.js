import React from "react";
import "./Pagination.css";

export const Pagination = ({ totalPagesNum, currentPage, updateTableData }) => {
  const numOfPages = [...Array(totalPagesNum + 1).keys()].slice(1);

  const nextPage = () => {
    updateTableData(currentPage + 1);
  };

  const prevPage = () => {
    updateTableData(currentPage - 1);
  };

  return (
    <div className="pagination">
      <button onClick={() => updateTableData(1)}>&laquo;</button>
      <button disabled={currentPage <= 1} onClick={prevPage}>
        &lt;
      </button>
      {numOfPages?.map((page, index) => (
        <button
          className={currentPage === page ? "active" : ""}
          onClick={() => updateTableData(page)}
          key={index}
        >
          {page}
        </button>
      ))}
      <button disabled={currentPage >= totalPagesNum} onClick={nextPage}>
        &gt;
      </button>
      <button onClick={() => updateTableData(totalPagesNum)}>&raquo;</button>
    </div>
  );
};
