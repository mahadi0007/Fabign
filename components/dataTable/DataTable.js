import React from "react";
import ReactDataTable from "react-data-table-component";
import { Loader } from "../loading";
import { NoContent } from "../204";

export const DataTable = (props) => {
  return (
    <ReactDataTable
      columns={props.columns}
      data={props.data}
      progressPending={props.loading}
      progressComponent={<Loader />}
      customStyles={props.customStyles}
      noDataComponent={
        <NoContent message={props.noDataMessage || "No content available."} />
      }
      pagination
      paginationServer
      paginationTotalRows={props.totalRows}
      onChangeRowsPerPage={props.handlePerRowsChange}
      onChangePage={props.handlePageChange}
      subHeader={props.searchable}
    />
  );
};
