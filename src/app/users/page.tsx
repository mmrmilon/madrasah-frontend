"use client";

import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 120 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "contact", headerName: "Contact", width: 200 },
  { field: "identificationnumber", headerName: "NRIC/Passport", width: 200 },
  { field: "nationality", headerName: "Nationality", width: 200 },
  { field: "role", headerName: "Role", width: 150 },
  { field: "accesslevel", headerName: "Access Level", width: 150 },
  { field: "isactive", headerName: "Status", width: 150 },
];

const Users = () => {
  const users = [
    {
      "userId": "M2024021001",
      "name": "user 01",
      "email": "user01@madrasah.com.my",
      "contact": "+60-13 365 6524",
      "identificationnumber": "154-254-3541",
      "nationality": "Malaysian",
      "role": "Teacher",
      "accesslevel": "Admin",
      "isactive": "Active",
    },
    {
      "userId": "M2024021002",
      "name": "user 02",
      "email": "user02@madrasah.com.my",
      "contact": "+60-13 365 6524",
      "identificationnumber": "154-254-3541",
      "nationality": "Malaysian",
      "role": "Teacher",
      "accesslevel": "User",
      "isactive": "Active",
    },
    {
      "userId": "M2024021003",
      "name": "user 03",
      "email": "user03@madrasah.com.my",
      "contact": "+60-13 365 6524",
      "identificationnumber": "154-254-3541",
      "nationality": "Malaysian",
      "role": "Teacher",
      "accesslevel": "Admin",
      "isactive": "Active",
    },
    {
      "userId": "M2024021004",
      "name": "user 04",
      "email": "user04@madrasah.com.my",
      "contact": "+60-13 365 6524",
      "identificationnumber": "154-254-3541",
      "nationality": "Malaysian",
      "role": "Teacher",
      "accesslevel": "Super Admin",
      "isactive": "Active",
    },
    {
      "userId": "M2024021005",
      "name": "user 05",
      "email": "user05@madrasah.com.my",
      "contact": "+60-13 365 6524",
      "identificationnumber": "154-254-3541",
      "nationality": "Malaysian",
      "role": "Teacher",
      "accesslevel": "User",
      "isactive": "Active",
    },
    {
      "userId": "M2024021006",
      "name": "user 06",
      "email": "user06@madrasah.com.my",
      "contact": "+60-13 365 6524",
      "identificationnumber": "154-254-3541",
      "nationality": "Malaysian",
      "role": "Staff",
      "accesslevel": "User",
      "isactive": "Active",
    },
    {
      "userId": "M2024021007",
      "name": "user 07",
      "email": "user07@madrasah.com.my",
      "contact": "+60-13 365 6524",
      "identificationnumber": "154-254-3541",
      "nationality": "Malaysian",
      "role": "Teacher",
      "accesslevel": "Admin",
      "isactive": "Active",
    },
    {
      "userId": "M2024021008",
      "name": "user 08",
      "email": "user08@madrasah.com.my",
      "contact": "+60-13 365 6524",
      "identificationnumber": "154-254-3541",
      "nationality": "Malaysian",
      "role": "Teacher",
      "accesslevel": "Admin",
      "isactive": "Active",
    },
    {
      "userId": "M2024021009",
      "name": "user 09",
      "email": "user09@madrasah.com.my",
      "contact": "+60-13 365 6524",
      "identificationnumber": "154-254-3541",
      "nationality": "Malaysian",
      "role": "Teacher",
      "accesslevel": "Admin",
      "isactive": "Active",
    },
    {
      "userId": "M2024021010",
      "name": "user 10",
      "email": "user10@madrasah.com.my",
      "contact": "+60-13 365 6524",
      "identificationnumber": "154-254-3541",
      "nationality": "Malaysian",
      "role": "Teacher",
      "accesslevel": "Admin",
      "isactive": "Active",
    }];

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Users;