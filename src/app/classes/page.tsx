"use client";

import Header from "@/app/(components)/Header";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ClassFormModal from "@/app/(components)/ClassFormModal";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import {
  useGetClassesQuery,
  useAddClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
  useFetchAllBatchesQuery,
  useGetSubjectsQuery
} from "@/state/api";

  export interface ClassFormData {
    id?:string;
    name: string;
    batchId: string;
    subjectId: string;
  }

  const fallbackClasses = [
    {
      "id": "C2024021001",
      "name": "Class 101",
      "batchId": "11",
      "subjectId": "12"
    },
    {
      "id": "C2024021002",
      "name": "Class 102",
      "batchId": "22",
      "subjectId": "23"
    }];

const Classes = () => {    
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editData, setEditData] = useState<ClassFormData | null>(null);

  const { data: apiClasses, isLoading, error } = useGetClassesQuery();
  const { data: apiBatches } = useFetchAllBatchesQuery();
  const { data: apiSubjects } = useGetSubjectsQuery();
  const [addClass] = useAddClassMutation();
  const [updateClass] = useUpdateClassMutation();
  const [deleteClass] = useDeleteClassMutation();

  const fallbackBatches = [
    {
      "id": "B2024021001",
      "year": "2016",
      "session": "2015-2016"
    },
    {
      "id": "B2024021002",
      "year": "2017",
      "session": "2016-2017"
    }]

    const fallbackSubjects = [
      {
        "id": "sub-101",
        "name": "Subject 101",
        "code": "101",
        "description": "Some description",
        "credit": 2,
        "textbookId": "101",
      },
      {
        "id": "sub-104",
        "name": "Subject 104",
        "code": "101",
        "description": "Some description",
        "credit": 3,
        "textbookId": "104",
      }
    ]
    
  
  // Use API data if available, fallback to local data if not
  const classes = apiClasses || fallbackClasses;
  const batches = apiBatches || fallbackBatches;
  const subjects = apiSubjects || fallbackSubjects;

  const columns: GridColDef[] = [
    //{ field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: "batchId",
      headerName: "Batch",
      width: 200,
      renderCell: (params) => {
        const batch = batches.find((batch) => batch.id === params.row.batchId);
        return <span>{batch?.year}</span>;
      },
    },  
    {
      field: "subjectId",
      headerName: "Subject",
      width: 200,
      renderCell: (params) => {
        const subject = subjects.find((sub) => sub.id === params.row.subjectId);
        return <span>{subject?.name}</span>;
      },
    },
  ];

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch class.");
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
    const selectedClass = classes.find(cls => cls.id === selectedRows[0]);    
    console.log(selectedClass);
    if (selectedClass) {      
      setModalMode('edit');
      setEditData(selectedClass);
      setIsModalOpen(true);
    }
    else{
      toast.error('No class found with the selected ID');
      return;
    }
  };

  const handleDelete = async () => {
    try {
      toast((t) => (
        <div className="flex flex-col gap-4">
          <span>Are you sure you want to delete the selected class?</span>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                toast.promise(
                  Promise.all(selectedRows.map(id => deleteClass(id.toString()))),
                  {
                    loading: 'Deleting...',
                    success: 'Class deleted successfully',
                    error: 'Failed to delete class'
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
      console.error('Error deleting class:', error);
      toast.error('Failed to delete class. Please try again.');
    }
  };

  const handleModalSubmit = async (formData: ClassFormData) => {
    try {
      if (modalMode === 'add') {
        await addClass(formData).unwrap();
      } else {
        await updateClass({
          id: formData.id,
          cls: formData
        }).unwrap();
      }
      setIsModalOpen(false);
    } catch (error) {
        console.error("Error saving class:", error);
        toast.error("Failed to save class.");
    } finally {
        setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <Header name="Classes" />
        <div className="flex space-x-2">
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Class
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
        rows={classes}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelectionChange}
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        loading={isLoading}
      />

      <ClassFormModal
        isOpen={isModalOpen}
        batches={batches}
        subjects={subjects}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editData || undefined}
        mode={modalMode}
      />
    </div>
  );
};

export default Classes; 