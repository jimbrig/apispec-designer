import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useApiStore } from '../stores/ApiStore';
import { 
  Info, Server, Tag, Shield, Route, Database,
  Plus, Trash2, Save, X
} from 'lucide-react';

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  multiline 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div 
        className="p-2 hover:bg-gray-50 rounded cursor-pointer group"
        onClick={() => setIsEditing(true)}
      >
        <div className="text-sm text-gray-500">{label}</div>
        <div className="font-medium">
          {value || <span className="text-gray-400 italic">Click to edit</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 bg-gray-50 rounded">
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      {multiline ? (
        <textarea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          rows={3}
        />
      ) : (
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
      )}
      <div className="flex space-x-2">
        <button
          onClick={handleSave}
          className="flex items-center px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Save size={14} className="mr-1" />
          Save
        </button>
        <button
          onClick={handleCancel}
          className="flex items-center px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          <X size={14} className="mr-1" />
          Cancel
        </button>
      </div>
    </div>
  );
};

const StructuredEditor: React.FC = observer(() => {
  const apiStore = useApiStore();
  const [activeSection, setActiveSection] = useState<string | null>('info');

  const updateInfo = (field: string, value: string) => {
    apiStore.updateApiSpec({
      ...apiStore.apiSpec,
      info: {
        ...apiStore.apiSpec.info,
        [field]: value
      }
    });
  };

  const addServer = () => {
    const newServer = {
      url: 'https://',
      description: 'New server'
    };
    apiStore.updateApiSpec({
      ...apiStore.apiSpec,
      servers: [...(apiStore.apiSpec.servers || []), newServer]
    });
  };

  const removeServer = (index: number) => {
    const servers = [...(apiStore.apiSpec.servers || [])];
    servers.splice(index, 1);
    apiStore.updateApiSpec({
      ...apiStore.apiSpec,
      servers
    });
  };

  const updateServer = (index: number, field: string, value: string) => {
    const servers = [...(apiStore.apiSpec.servers || [])];
    servers[index] = {
      ...servers[index],
      [field]: value
    };
    apiStore.updateApiSpec({
      ...apiStore.apiSpec,
      servers
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg divide-y">
      {/* Info Section */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Info size={20} className="mr-2" />
          API Information
        </h2>
        <div className="space-y-4">
          <EditableField
            label="Title"
            value={apiStore.apiSpec.info.title}
            onChange={(value) => updateInfo('title', value)}
          />
          <EditableField
            label="Version"
            value={apiStore.apiSpec.info.version}
            onChange={(value) => updateInfo('version', value)}
          />
          <EditableField
            label="Description"
            value={apiStore.apiSpec.info.description || ''}
            onChange={(value) => updateInfo('description', value)}
            multiline
          />
        </div>
      </div>

      {/* Servers Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Server size={20} className="mr-2" />
            Servers
          </h2>
          <button
            onClick={addServer}
            className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus size={14} className="mr-1" />
            Add Server
          </button>
        </div>
        <div className="space-y-4">
          {(apiStore.apiSpec.servers || []).map((server, index) => (
            <div key={index} className="border rounded p-3">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">Server {index + 1}</h3>
                <button
                  onClick={() => removeServer(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <EditableField
                label="URL"
                value={server.url}
                onChange={(value) => updateServer(index, 'url', value)}
              />
              <EditableField
                label="Description"
                value={server.description || ''}
                onChange={(value) => updateServer(index, 'description', value)}
                multiline
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default StructuredEditor;