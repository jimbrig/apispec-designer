import React from 'react';
import { Component, Database, Key, ArrowRight } from 'lucide-react';

interface ComponentsSectionProps {
  components: {
    schemas?: Record<string, any>;
    securitySchemes?: Record<string, any>;
    parameters?: Record<string, any>;
    responses?: Record<string, any>;
    requestBodies?: Record<string, any>;
    headers?: Record<string, any>;
  };
}

const ComponentsSection: React.FC<ComponentsSectionProps> = ({ components }) => {
  if (Object.keys(components).length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No components defined.
      </div>
    );
  }

  const renderSchemaProperties = (properties: Record<string, any>) => {
    return (
      <div className="ml-4 space-y-1">
        {Object.entries(properties).map(([name, prop]) => (
          <div key={name} className="flex items-center text-sm">
            <span className="font-mono text-blue-600">{name}</span>
            <ArrowRight size={12} className="mx-2" />
            <span className="font-mono text-gray-600">{prop.type}</span>
            {prop.format && (
              <span className="text-gray-500 ml-2">({prop.format})</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {components.schemas && Object.keys(components.schemas).length > 0 && (
        <div>
          <h3 className="flex items-center text-sm font-medium mb-2">
            <Database size={16} className="mr-2" />
            Schemas
          </h3>
          <div className="space-y-3">
            {Object.entries(components.schemas).map(([name, schema]) => (
              <div key={name} className="border rounded-md p-3">
                <div className="font-medium mb-2">{name}</div>
                {schema.properties && renderSchemaProperties(schema.properties)}
              </div>
            ))}
          </div>
        </div>
      )}

      {components.securitySchemes && Object.keys(components.securitySchemes).length > 0 && (
        <div>
          <h3 className="flex items-center text-sm font-medium mb-2">
            <Key size={16} className="mr-2" />
            Security Schemes
          </h3>
          <div className="space-y-3">
            {Object.entries(components.securitySchemes).map(([name, scheme]) => (
              <div key={name} className="border rounded-md p-3">
                <div className="font-medium mb-2">{name}</div>
                <div className="text-sm space-y-1">
                  <div>Type: {(scheme as any).type}</div>
                  {(scheme as any).scheme && (
                    <div>Scheme: {(scheme as any).scheme}</div>
                  )}
                  {(scheme as any).description && (
                    <div className="text-gray-600">
                      {(scheme as any).description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add similar sections for parameters, responses, requestBodies, headers */}
      {['parameters', 'responses', 'requestBodies', 'headers'].map((section) => {
        const items = components[section as keyof typeof components];
        if (!items || Object.keys(items).length === 0) return null;

        return (
          <div key={section}>
            <h3 className="flex items-center text-sm font-medium mb-2">
              <Component size={16} className="mr-2" />
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </h3>
            <div className="space-y-3">
              {Object.entries(items).map(([name, item]) => (
                <div key={name} className="border rounded-md p-3">
                  <div className="font-medium mb-2">{name}</div>
                  <div className="text-sm text-gray-600">
                    {(item as any).description || 'No description'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentsSection;