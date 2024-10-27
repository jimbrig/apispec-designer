import React from 'react';
import { FileText, Book, Layers } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useApiStore } from '../stores/ApiStore';
import type { ViewerOption } from '../types/viewer';

const viewers: ViewerOption[] = [
  { id: 'redoc', label: 'Redoc', icon: 'FileText' },
  { id: 'swagger', label: 'Swagger UI', icon: 'Book' },
  { id: 'rapidoc', label: 'RapiDoc', icon: 'Layers' }
];

const ViewerSelector: React.FC = observer(() => {
  const apiStore = useApiStore();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText size={16} />;
      case 'Book':
        return <Book size={16} />;
      case 'Layers':
        return <Layers size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex space-x-2 mb-4">
      {viewers.map((viewer) => (
        <button
          key={viewer.id}
          onClick={() => apiStore.setViewer(viewer.id)}
          className={`flex items-center px-3 py-2 rounded-md text-sm ${
            apiStore.selectedViewer === viewer.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="mr-2">{getIcon(viewer.icon)}</span>
          {viewer.label}
        </button>
      ))}
    </div>
  );
});

export default ViewerSelector;