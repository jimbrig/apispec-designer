import React, { useState } from 'react';
import { Code } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useApiStore } from '../stores/ApiStore';
import FormatToggle from './FormatToggle';

const ApiSpecification = observer(() => {
  const apiStore = useApiStore();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const success = apiStore.updateSpecFromString(e.target.value);
    if (success) {
      setError(null);
    } else {
      setError(`Invalid ${apiStore.specFormat.toUpperCase()} format`);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Code className="mr-2" size={20} />
          API Specification
        </h2>
        <FormatToggle
          format={apiStore.specFormat}
          onChange={(format) => apiStore.setSpecFormat(format)}
        />
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {error}
        </div>
      )}
      
      <textarea
        className="w-full h-[calc(100vh-400px)] p-4 font-mono text-sm border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        value={apiStore.formattedSpec}
        onChange={handleChange}
        spellCheck={false}
      />
    </div>
  );
});

export default ApiSpecification;