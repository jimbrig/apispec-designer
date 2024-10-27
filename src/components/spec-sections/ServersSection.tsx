import React from 'react';
import { Globe } from 'lucide-react';

interface ServerVariable {
  enum?: string[];
  default: string;
  description?: string;
}

interface Server {
  url: string;
  description?: string;
  variables?: Record<string, ServerVariable>;
}

interface ServersSectionProps {
  servers: Server[];
}

const ServersSection: React.FC<ServersSectionProps> = ({ servers }) => {
  if (!servers.length) {
    return (
      <div className="text-sm text-gray-500">
        No servers defined. Default to the current host.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {servers.map((server, index) => (
        <div key={index} className="border rounded-md p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Globe size={16} />
            <span className="font-medium">{server.url}</span>
          </div>
          {server.description && (
            <p className="text-sm text-gray-600 mb-2">{server.description}</p>
          )}
          {server.variables && Object.keys(server.variables).length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Variables:</h4>
              <div className="space-y-2">
                {Object.entries(server.variables).map(([name, variable]) => (
                  <div key={name} className="text-sm">
                    <span className="font-mono text-blue-600">{name}</span>
                    <span className="text-gray-500"> = </span>
                    <span className="font-mono">{variable.default}</span>
                    {variable.enum && (
                      <div className="text-gray-500 ml-4">
                        Options: {variable.enum.join(', ')}
                      </div>
                    )}
                    {variable.description && (
                      <div className="text-gray-600 ml-4">{variable.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServersSection;