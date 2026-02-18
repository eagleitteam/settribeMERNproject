import React from "react";
import "./dataTable.css";

const DataTable = ({
  title,
  columns,
  data,
  loading,
  totalRecords,
  params,
  setParams,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const totalPages = Math.ceil(totalRecords / params.limit);

  const handleSort = (accessor) => {
    setParams({
      ...params,
      sortBy: accessor,
      sortOrder:
        params.sortBy === accessor && params.sortOrder === "asc"
          ? "desc"
          : "asc",
    });
  };

  const handleSearch = (e) => {
    setParams({ ...params, search: e.target.value, page: 1 });
  };

  return (
    <div className="container-fluid mt-4 data-table-wrapper">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5>{title}</h5>
          <button className="btn btn-primary btn-sm" onClick={onAdd}>
            + Add
          </button>
        </div>

        <div className="card-body">
          {/* Search */}
          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search..."
                value={params.search}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle data-table">
              <thead>
                <tr>
                  <th>Sr</th>
                  {columns.map((col) => (
                    <th
                      key={col.accessor}
                      onClick={() => handleSort(col.accessor)}
                      className="sortable"
                    >
                      {col.header}
                      {params.sortBy === col.accessor && (
                        <span>
                          {params.sortOrder === "asc" ? " ▲" : " ▼"}
                        </span>
                      )}
                    </th>
                  ))}
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={columns.length + 2} className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 2} className="text-center">
                      No Records Found
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr key={row.id}>
                      <td>
                        {(params.page - 1) * params.limit + index + 1}
                      </td>

                      {columns.map((col) => (
                        <td key={col.accessor}>{row[col.accessor]}</td>
                      ))}

                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => onEdit(row)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onDelete(row)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="card-footer d-flex justify-content-end">
            <button
              className="btn btn-sm btn-light me-2"
              disabled={params.page === 1}
              onClick={() =>
                setParams({ ...params, page: params.page - 1 })
              }
            >
              Prev
            </button>

            <span className="pt-1 small">
              Page {params.page} of {totalPages}
            </span>

            <button
              className="btn btn-sm btn-light ms-2"
              disabled={params.page === totalPages}
              onClick={() =>
                setParams({ ...params, page: params.page + 1 })
              }
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
