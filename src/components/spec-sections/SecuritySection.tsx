import React from 'react';
import { Shield, Key } from 'lucide-react';

interface SecurityRequirement {
  [key: string]: string[];
}

interface SecuritySectionProps {
  security: SecurityRequirement[];
}

const SecuritySection: React.FC<SecuritySectionProps> = ({ security }) => {
  if (!security.length) {
    return (
      <div className="text-sm text-gray-500">
        No global security requirements defined.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {security.map((requirement, index) => (
        <div key={index} className="border rounded-md p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Shield size={16} />
            <span className="font-medium">Security Requirement {index + 1}</span>
          </div>
          <div className="space-y-2">
            {Object.entries(requirement).map(([scheme, scopes]) => (
              <div key={scheme} className="ml-4">
                <div className="flex items-center space-x-2">
                  <Key size={14} />
                  <span className="text-sm font-medium">{scheme}</span>
                </div>
                {scopes.length > 0 && (
                  <div className="ml-6 mt-1">
                    <div className="text-sm text-gray-600">Required scopes:</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {scopes.map((scope) => (
                        <span
                          key={scope}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          {scope}
                        </span>
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

export default SecuritySection;