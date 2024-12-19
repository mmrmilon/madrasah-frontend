"use client";

import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "classId", headerName: "ID", width: 120 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "noOfStudent", headerName: "Number of Student", width: 200 },
  { field: "noOfTeacher", headerName: "Number of Teacher", width: 200 },
];


const Classes = () => {
  const classes = [
    {
      "classId": "C2024021001",
      "name": "Class 101",
      "noOfStudent": "100",
      "noOfTeacher": "10"
    },
    {
      "classId": "C2024021002",
      "name": "Class 102",
      "noOfStudent": "105",
      "noOfTeacher": "09"
    }];

  return (
    <div className="flex flex-col">
      <Header name="Classes" />
      <DataGrid
        rows={classes}
        columns={columns}
        getRowId={(row) => row.classId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Classes;