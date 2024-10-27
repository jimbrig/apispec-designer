import React from 'react';
import { FileJson, FileText } from 'lucide-react';
import type { SpecFormat } from '../stores/ApiStore';

interface FormatToggleProps {
  format: SpecFormat;
  onChange: (format: SpecFormat) => void;
}

const FormatToggle: React.FC<FormatToggleProps> = ({ format, onChange }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onChange('yaml')}
        className={`flex items-center px-3 py-2 rounded-md text-sm ${
          format === 'yaml'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <FileText size={16} className="mr-2" />
        YAML
      </button>
      <button
        onClick={() => onChange('json')}
        className={`flex items-center px-3 py-2 rounded-md text-sm ${
          format === 'json'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <FileJson size={16} className="mr-2" />
        JSON
      </button>
    </div>
  );
};

export default FormatToggle;