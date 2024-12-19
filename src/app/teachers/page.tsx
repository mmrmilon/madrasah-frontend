"use client";

import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "teacherId", headerName: "ID", width: 120 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "contact", headerName: "Contact", width: 200 },
  { field: "identificationnumber", headerName: "NRIC/Passport", width: 200 },
  { field: "nationality", headerName: "Nationality", width: 200 },
  { field: "position", headerName: "Position", width: 150 },
  { field: "dateOfJoining", headerName: "Date of Joining", width: 150 },
  { field: "specialized", headerName: "Specialized", width: 150 },
  { field: "isactive", headerName: "Status", width: 150 },
];

const Teachers = () => {
  const teachers = [
    {
      "teacherId": "T2024021001",
      "name": "Teacher 101",
      "email": "teacher101@madrasah.com.my",
      "contact": "+60-13 365 6524",
      "identificationnumber": "154-254-3541",
      "nationality": "Malaysian",
      "position": "Lecturer",
      "dateOfJoining": "01 Jan 2015",
      "specialized": "Bukhari Part 1",
      "isactive": "Active",
    },
    {
      "teacherId": "T2024021002",
      "name": "Teacher 102",
      "email": "teacher102@madrasah.com.my",
      "contact": "+60-11 365 6512",
      "identificationnumber": "144-254-3512",
      "nationality": "Malaysian",
      "position": "Lecturer",
      "dateOfJoining": "01 Jan 2015",
      "specialized": "Bukhari Part 2",
      "isactive": "Active",
    },
    {
      "teacherId": "T2024021003",
      "name": "Teacher 103",
      "email": "teacher103@madrasah.com.my",
      "contact": "+60-13 364 6587",
      "identificationnumber": "144-254-3541",
      "nationality": "Malaysian",
      "position": "Assistant Lecturer",
      "dateOfJoining": "01 Jan 2015",
      "specialized": "Bukhari Part 3",
      "isactive": "Active",
    },
  ];

    return (
      <div className="flex flex-col">
        <Header name="Users" />
        <DataGrid
          rows={teachers}
          columns={columns}
          getRowId={(row) => row.teacherId}
          checkboxSelection
          className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        />
      </div>
    );
}
  
  export default Teachers