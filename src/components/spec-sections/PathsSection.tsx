import React from 'react';
import { Route, ArrowRight } from 'lucide-react';

interface PathsMethod {
  summary?: string;
  description?: string;
  operationId?: string;
  tags?: string[];
  parameters?: any[];
  requestBody?: any;
  responses?: Record<string, any>;
  security?: any[];
}

interface PathsItem {
  [method: string]: PathsMethod;
}

interface PathsSectionProps {
  paths: Record<string, PathsItem>;
}

const methodColors: Record<string, string> = {
  get: 'bg-blue-100 text-blue-800',
  post: 'bg-green-100 text-green-800',
  put: 'bg-yellow-100 text-yellow-800',
  delete: 'bg-red-100 text-red-800',
  patch: 'bg-purple-100 text-purple-800',
  options: 'bg-gray-100 text-gray-800',
  head: 'bg-gray-100 text-gray-800',
  trace: 'bg-gray-100 text-gray-800'
};

const PathsSection: React.FC<PathsSectionProps> = ({ paths }) => {
  if (Object.keys(paths).length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No paths defined.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(paths).map(([path, methods]) => (
        <div key={path} className="border rounded-md p-3">
          <div className="flex items-center space-x-2 mb-3">
            <Route size={16} />
            <code className="font-mono text-sm">{path}</code>
          </div>
          <div className="space-y-2">
            {Object.entries(methods).map(([method, operation]) => (
              <div key={method} className="ml-4 p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`uppercase text-xs font-bold px-2 py-1 rounded ${methodColors[method]}`}>
                    {method}
                  </span>
                  {operation.summary && (
                    <span className="text-sm font-medium">{operation.summary}</span>
                  )}
                </div>
                {operation.description && (
                  <p className="text-sm text-gray-600 mb-2">{operation.description}</p>
                )}
                {operation.tags && operation.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {operation.tags.map((tag: string) => (
                      <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {operation.responses && (
                  <div className="text-sm">
                    <div className="font-medium mb-1">Responses:</div>
                    <div className="space-y-1">
                      {Object.entries(operation.responses).map(([code, response]) => (
                        <div key={code} className="flex items-center">
                          <span className="font-mono text-xs px-2 py-1 rounded bg-gray-200">
                            {code}
                          </span>
                          <ArrowRight size={12} className="mx-2" />
                          <span className="text-gray-600">
                            {(response as any).description || 'No description'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PathsSection;