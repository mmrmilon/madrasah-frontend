"use client";

import Header from "@/app/(components)/Header";
import { toast } from "react-hot-toast";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import { 
  useGetSubjectsQuery, 
  useAddSubjectMutation, 
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
  useFetchAllTextbooksQuery
} from "@/state/api";
import SubjectFormModal from "../(components)/SubjectFormModal";

export interface SubjectFormData {
  id?: string; 
  name: string;
  code: string;
  description: string;
  credit: number;
  textbookId: string;  
}

const fallbackSubjects = [
  {
    "id": "sub-101",
    "name": "Subject 101",
    "code": "101",
    "description": "Some description",
    "credit": "2",
    "textbookId": "101",
  },
  {
    "id": "sub-104",
    "name": "Subject 104",
    "code": "101",
    "description": "Some description",
    "credit": "3",
    "textbookId": "104",
  },
  {
    "id": "sub-108",
    "name": "Subject 108",
    "code": "101",
    "description": "Some description",
    "credit": "4",
    "textbookId": "108",
  }
]

const fallbackTextbooks = [
  {
      id: "1",
      name: "Book Title 1",
      description: "Description of Book 1",
      authorName: "Author 1"
    },
    {
      id: "2",
      name: "Book Title 2",
      description: "Description of Book 2",
      authorName: "Author 2"
    }
];

const Subjects = () => {

  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editData, setEditData] = useState<SubjectFormData | null>(null);

  // API hooks
  const { data: apiSubjects, isLoading, error } = useGetSubjectsQuery();
  const {data: apiTextbooks} = useFetchAllTextbooksQuery();
  const [addSubject] = useAddSubjectMutation();
  const [updateSubject] = useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();

  // Use API data if available, fallback to local data if not
  const subjects = apiSubjects || fallbackSubjects;
  const textbooks = apiTextbooks || fallbackTextbooks;

  const columns: GridColDef[] = [    
    { field: "name", headerName: "Name", width: 200 },
    { field: "code", headerName: "Code", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "credit", headerName: "Credit Hour", width: 150 },
    {
      field: "textbookId",
      headerName: "Text Book",
      width: 200,
      renderCell: (params) => {
        const textbook = textbooks.find((tb) => tb.id === params.row.textbookId);
        return <span>{textbook?.name}</span>;
      },
    }
  ];
  
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch subjects.");
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
    const selectedSubject = subjects.find(subject => subject.id === selectedRows[0]);    
    if (selectedSubject) {      
      setModalMode('edit');
      setEditData(selectedSubject);
      setIsModalOpen(true);
    }
    else{
      toast.error('No Subject found with the selected ID');
      return;
    }
  };

  const handleDelete = async () => {
    try {
      toast((t) => (
        <div className="flex flex-col gap-4">
          <span>Are you sure you want to delete the selected subject(s)?</span>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                toast.promise(
                  Promise.all(selectedRows.map(id => deleteSubject(id.toString()))),
                  {
                    loading: 'Deleting...',
                    success: 'Subject deleted successfully',
                    error: 'Failed to delete subject'
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
      console.error('Error deleting subject:', error);
      toast.error('Failed to delete subject. Please try again.');
    }
  };

  const handleModalSubmit = async (formData: SubjectFormData) => {
    try {
      if (modalMode === 'add') {
        await addSubject(formData).unwrap();
      } else {
        await updateSubject({
          id: formData.id,
          subject: formData
        }).unwrap();
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving subject:', error);
      alert('Failed to save subject. Please try again.');
    }
  };
  
  
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <Header name="Subjects" />
        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
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
        rows={subjects}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelectionChange}
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        loading={isLoading}
      />

      <SubjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        textbooks={textbooks}
        initialData={editData || undefined}
        mode={modalMode}
      />
    </div>
  );
  }
  
  export default Subjects