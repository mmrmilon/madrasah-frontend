"use client";

import Header from "@/app/(components)/Header";
import { useEffect, useState } from "react";
import CourseFormModal from "@/app/(components)/CourseFormModal";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import {
  useFetchAllCoursesQuery,
  useAddCourseMutation,
  useEditCourseMutation,
  useDeleteCourseMutation
} from "@/state/api";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "duration", headerName: "Duration", width: 200 }
];

export interface CourseFormData {
  name: string;
  duration: number;
}

const fallbackBatches = [
  {
    "id": "1",
    "name": "Test Course 101",
    "duration": "4"
  }
];

const Courses = () => {
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editData, setEditData] = useState<CourseFormData | null>(null);
  
  const { data: apiCourses, isLoading, error } = useFetchAllCoursesQuery();
  const [addCourse] = useAddCourseMutation();
  const [editCourse] = useEditCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  // Use API data if available, fallback to local data if not
  const courses = apiCourses || fallbackBatches;

  useEffect(() => {
      if (error) {
        toast.error("Failed to fetch batches.");
      }
  }, [error]);
  
  const handleRowSelectionChange = (newSelection: GridRowSelectionModel) => {
      setSelectedRows(newSelection);
  };

  const handleAdd = () => {
    setModalMode('add');
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    const selectedCourse = courses.find(course => course.id === selectedRows[0]);    
    if (selectedCourse) {      
        setModalMode('edit');
        setEditData({
            ...selectedCourse,
            duration: Number(selectedCourse.duration)
        });
        setIsModalOpen(true);
    }
    else{
        toast.error('No course found with the selected ID');
        return;
    }
  };

  const handleDelete = () => {
    try {
        toast((t) => (
          <div className="flex flex-col gap-4">
            <span>Are you sure you want to delete the selected course?</span>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  toast.promise(
                    Promise.all(selectedRows.map(id => deleteCourse(id.toString()))),
                    {
                      loading: 'Deleting...',
                      success: 'Course deleted successfully',
                      error: 'Failed to delete course'
                    }
                  );
                }}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
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
        console.error('Error deleting course:', error);
        toast.error('Failed to delete course. Please try again.');
    }
  };

  const handleModalSubmit = async (formData: any) => {
    try {
        if (modalMode === 'add') {
            await addCourse(formData).unwrap();
        } else {
            await editCourse({
                id: formData.id,
                course: formData
            }).unwrap();
        }
        setIsModalOpen(false);
    } catch (error) {
        console.error("Error saving textbook:", error);
        toast.error("Failed to save textbook.");
    } finally {
        setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-5">            
        <Header name="Courses" />
        <div className="flex space-x-2">
          <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Add Course
          </button>
          <button
              onClick={handleEdit}
              disabled={selectedRows.length !== 1}
              className={`px-4 py-2 rounded-lg ${selectedRows.length === 1 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
              Edit
          </button>
          <button
              onClick={handleDelete}
              disabled={selectedRows.length === 0}
              className={`px-4 py-2 rounded-lg ${selectedRows.length > 0 ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
              Delete
          </button>
        </div>
      </div>
      <DataGrid
        rows={courses}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        onRowSelectionModelChange={handleRowSelectionChange}
        loading={isLoading}
      />
      <CourseFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editData || undefined}
        mode={modalMode}
      />
    </div>
  )
}
  
export default Courses