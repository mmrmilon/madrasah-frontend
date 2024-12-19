"use client";

import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "studentId", headerName: "ID", width: 120 },
  { field: "registrationId", headerName: "Registration ID", width: 120 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "dateofbirth", headerName: "Date of Birth", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "contact", headerName: "Contact", width: 200 },
  { field: "identificationnumber", headerName: "NRIC/Passport", width: 200 },
  { field: "nationality", headerName: "Nationality", width: 200 },
  { field: "enrollmentyear", headerName: "Enrollment On", width: 150 },
  { field: "isactive", headerName: "Status", width: 150 },
];

const Students = () => {
  const students = [
    {
      "studentId": "2024021001",
      "registrationId": "S202412R001",
      "name": "Student 101",
      "dateofbirth": "01 Jan, 2012",
      "email": "student101@madrasah.com.my",
      "contact": "+60-13 365 6524",
      "identificationnumber": "154-254-3541",
      "nationality": "Malaysian",
      "enrollmentyear": "2024",
      "isactive": "Active",
    },
    {
      "studentId": "2024021002",
      "registrationId": "S202412R002",
      "name": "Student 102",
      "dateofbirth": "01 Feb, 2012",
      "email": "student102@madrasah.com.my",
      "contact": "+60-12 365 6522",
      "identificationnumber": "124-254-3531",
      "nationality": "Bangladesh",
      "enrollmentyear": "2024",
      "isactive": "Active",
    },
    {
      "studentId": "2024021003",
      "registrationId": "S202412R003",
      "name": "Student 103",
      "dateofbirth": "05 Jan, 2012",
      "email": "student103@madrasah.com.my",
      "contact": "+60-13 325 6521",
      "identificationnumber": "174-251-3581",
      "nationality": "Malaysian",
      "enrollmentyear": "2024",
      "isactive": "Active",
    },
    {
      "studentId": "2024021004",
      "registrationId": "S202412R004",
      "name": "Student 104",
      "dateofbirth": "12 Jan, 2012",
      "email": "student104@madrasah.com.my",
      "contact": "+60-14 368 6522",
      "identificationnumber": "134-214-3843",
      "nationality": "Malaysian",
      "enrollmentyear": "2024",
      "isactive": "Active",
    },
    {
      "studentId": "2024021005",
      "registrationId": "S202412R005",
      "name": "Student 105",
      "dateofbirth": "09 Jan, 2012",
      "email": "student105@madrasah.com.my",
      "contact": "+60-11 362 6527",
      "identificationnumber": "134-274-3543",
      "nationality": "Malaysian",
      "enrollmentyear": "2024",
      "isactive": "Active",
    },
    {
      "studentId": "2024021006",
      "registrationId": "S202412R006",
      "name": "Student 106",
      "dateofbirth": "07 Jan, 2012",
      "email": "student106@madrasah.com.my",
      "contact": "+60-13 387 6374",
      "identificationnumber": "161-254-5314",
      "nationality": "Malaysian",
      "enrollmentyear": "2024",
      "isactive": "Active",
    },
    {
      "studentId": "2024021007",
      "registrationId": "S202412R007",
      "name": "Student 107",
      "dateofbirth": "10 Jan, 2012",
      "email": "student107@madrasah.com.my",
      "contact": "+60-11 369 6533",
      "identificationnumber": "155-256-3511",
      "nationality": "Malaysian",
      "enrollmentyear": "2024",
      "isactive": "Active",
    },
  ]
  return (
    <div className="flex flex-col">
      <Header name="Students" />
      <DataGrid
        rows={students}
        columns={columns}
        getRowId={(row) => row.studentId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
}
  
  export default Students