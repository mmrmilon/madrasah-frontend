"use client";

import Header from "@/app/(components)/Header";
import { toast } from "react-hot-toast";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import StudentFormModal from "@/app/(components)/StudentFormModal";
import { 
  useGetStudentsQuery, 
  useAddStudentMutation, 
  useUpdateStudentMutation, 
  useDeleteStudentMutation 
} from "@/state/api";

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

// Keep existing student data as fallback
const fallbackStudents = [
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
];

const Students = () => {
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editData, setEditData] = useState(null);

  // API hooks
  const { data: apiStudents, isLoading, error } = useGetStudentsQuery();
  const [addStudent] = useAddStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();

  // Use API data if available, fallback to local data if not
  const students = apiStudents || fallbackStudents;

  const handleRowSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectedRows(newSelection);
  };

  const handleAdd = () => {
    setModalMode('add');
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    const selectedStudent = students.find(student => student.studentId === selectedRows[0]);    
    if (!selectedStudent) {      
      setModalMode('edit');
      setEditData(selectedStudent || null);
      setIsModalOpen(true);
    }
    else{
      toast.error('No student found with the selected ID');
      return;
    }
  };

  const handleDelete = async () => {
    try {
      toast((t) => (
        <div className="flex flex-col gap-4">
          <span>Are you sure you want to delete the selected student(s)?</span>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                toast.promise(
                  Promise.all(selectedRows.map(id => deleteStudent(id.toString()))),
                  {
                    loading: 'Deleting...',
                    success: 'Students deleted successfully',
                    error: 'Failed to delete students'
                  }
                );
              }}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ), {
        duration: 5000,
        position: 'top-center',
      });
    } catch (error) {
      console.error('Error deleting students:', error);
      toast.error('Failed to delete students. Please try again.');
    }
  };

  const handleModalSubmit = async (formData: any) => {
    try {
      if (modalMode === 'add') {
        await addStudent(formData).unwrap();
      } else {
        await updateStudent({
          id: formData.studentId,
          student: formData
        }).unwrap();
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving student:', error);
      alert('Failed to save student. Please try again.');
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <Header name="Students" />
        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </button>
          <button
            onClick={handleEdit}
            disabled={selectedRows.length !== 1}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors
              ${selectedRows.length === 1
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={selectedRows.length === 0}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors
              ${selectedRows.length > 0
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <DataGrid
        rows={students}
        columns={columns}
        getRowId={(row) => row.studentId}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelectionChange}
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        loading={isLoading}
      />

      <StudentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editData || undefined}
        mode={modalMode}
      />
    </div>
  );
};

export default Students;