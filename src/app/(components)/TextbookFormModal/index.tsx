import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface TextbookFormData {
  name: string;
  description: string;
  authorName: string;
}

interface TextbookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TextbookFormData) => void;
  initialData?: TextbookFormData;
  mode: 'add' | 'edit';
}

const TextbookFormModal: React.FC<TextbookFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode
}) => {
  const [formData, setFormData] = useState<TextbookFormData>({
    name: '',
    description: '',
    authorName: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: '', description: '', authorName: '' });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-200/80 pb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                    {mode === 'add' ? 'Add New TextBook' : 'Edit TextBook'}
                </h2>
                <button onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full">
                    <X size={24} />
                </button>
            </div>        
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Author Name</label>
                <input
                type="text"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200/80">
                <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
                >
                Close
                </button>
                <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                {mode === 'add' ? 'Add Book' : 'Save Changes'}
                </button>
            </div>
            </form>
        </div>    
      </div>
    </div>
  );
};

export default TextbookFormModal; 