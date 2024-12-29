"use client";

import Header from "@/app/(components)/Header";
import { useEffect, useState } from "react";
import BatchFormModal from "@/app/(components)/BatchFormModal";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import {
    useFetchAllBatchesQuery,
    useAddBatchMutation,
    useEditBatchMutation,
    useDeleteBatchMutation,
  } from "@/state/api";

const columns: GridColDef[] = [
  { field: "batchId", headerName: "ID", width: 120 },
  { field: "year", headerName: "Year", width: 200 },
  { field: "session", headerName: "Session", width: 200 }
];

const fallbackBatches = [
    {
      "batchId": "B2024021001",
      "year": "2016",
      "session": "2015-2016"
    },
    {
      "batchId": "B2024021002",
      "year": "2017",
      "session": "2016-2017"
    },
    {
      "batchId": "B2024021003",
      "year": "2018",
      "session": "2017-2018"
    },
    {
      "batchId": "B2024021004",
      "year": "2019",
      "session": "2018-2019"
    },
    {
      "batchId": "B2024021005",
      "year": "2020",
      "session": "2019-2020"
    },
    {
      "batchId": "B2024021006",
      "year": "2021",
      "session": "2020-2021"
    },
    {
      "batchId": "B2024021007",
      "year": "2022",
      "session": "2021-2022"
    }
  ];

const Batches = () => {
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editData, setEditData] = useState(null);
  
    const { data: apiBatches, isLoading, error } = useFetchAllBatchesQuery();
    const [addBatch] = useAddBatchMutation();
    const [editBatch] = useEditBatchMutation();
    const [deleteBatch] = useDeleteBatchMutation();

    // Use API data if available, fallback to local data if not
    const batches = apiBatches || fallbackBatches;

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
        const selectedBatch = batches.find(batch => batch.batchId === selectedRows[0]);    
        if (!selectedBatch) {      
            setModalMode('edit');
            setEditData(selectedBatch || null);
            setIsModalOpen(true);
        }
        else{
            toast.error('No batch found with the selected ID');
            return;
        }
    };

    const handleDelete = () => {
        try {
            toast((t) => (
              <div className="flex flex-col gap-4">
                <span>Are you sure you want to delete the selected batch?</span>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      toast.dismiss(t.id);
                      toast.promise(
                        Promise.all(selectedRows.map(id => deleteBatch(id.toString()))),
                        {
                          loading: 'Deleting...',
                          success: 'Batch deleted successfully',
                          error: 'Failed to delete batch'
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
            console.error('Error deleting students:', error);
            toast.error('Failed to delete students. Please try again.');
        }
    };

    const handleModalSubmit = async (formData: any) => {
        try {
            if (modalMode === 'add') {
                await addBatch(formData).unwrap();
            } else {
                await editBatch({
                    id: formData.bookId,
                    batch: formData
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
            <Header name="Batches" />
            <div className="flex space-x-2">
            <button
                onClick={handleAdd}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Add Batch
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
        rows={batches}
        columns={columns}
        getRowId={(row) => row.batchId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        onRowSelectionModelChange={handleRowSelectionChange}
        loading={isLoading}
        />

        <BatchFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editData || undefined}
        mode={modalMode}
      />
    </div>
    );
  }
  
  export default Batches