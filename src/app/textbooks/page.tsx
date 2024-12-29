"use client";

import Header from "@/app/(components)/Header";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import TextbookFormModal from "@/app/(components)/TextbookFormModal";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import {
  useFetchAllTextbooksQuery,
  useAddTextbookMutation,
  useEditTextbookMutation,
  useDeleteTextbookMutation,
} from "@/state/api";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'authorName', headerName: 'Author', width: 200 },
  ];

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

const Textbooks = () => {    
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editData, setEditData] = useState(null);

  const { data: apiTextbooks, isLoading, error } = useFetchAllTextbooksQuery();
  const [addTextbook] = useAddTextbookMutation();
  const [editTextbook] = useEditTextbookMutation();
  const [deleteTextbook] = useDeleteTextbookMutation();

  
  // Use API data if available, fallback to local data if not
  const textbooks = apiTextbooks || fallbackTextbooks;

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch textbooks.");
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
    const selectedTextbook = textbooks.find(book => book.id === selectedRows[0]);    
    if (!selectedTextbook) {      
      setModalMode('edit');
      setEditData(selectedTextbook || null);
      setIsModalOpen(true);
    }
    else{
      toast.error('No textbook found with the selected ID');
      return;
    }
  };

  const handleDelete = async () => {
    try {
      toast((t) => (
        <div className="flex flex-col gap-4">
          <span>Are you sure you want to delete the selected textbook?</span>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                toast.promise(
                  Promise.all(selectedRows.map(id => deleteTextbook(id.toString()))),
                  {
                    loading: 'Deleting...',
                    success: 'Textbook deleted successfully',
                    error: 'Failed to delete textbook'
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
      console.error('Error deleting textbook:', error);
      toast.error('Failed to delete textbook. Please try again.');
    }
  };

  const handleModalSubmit = async (formData: any) => {
    try {
      if (modalMode === 'add') {
        await addTextbook(formData).unwrap();
      } else {
        await editTextbook({
          id: formData.id,
          textbook: formData
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
        <Header name="Students" />
        <div className="flex space-x-2">
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Book
          </button>
          <button
            onClick={handleEdit}
            disabled={selectedRows.length !== 1}
            className={`px-4 py-2 rounded-lg ${selectedRows.length === 1 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={selectedRows.length === 0}
            className={`px-4 py-2 rounded-lg ${selectedRows.length > 0 ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Delete
          </button>
        </div>
      </div>
     
      <DataGrid
        rows={textbooks}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelectionChange}
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        loading={isLoading}
      />

      <TextbookFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editData || undefined}
        mode={modalMode}
      />
    </div>
  );
};

export default Textbooks; 