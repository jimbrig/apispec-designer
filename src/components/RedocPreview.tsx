import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useApiStore } from '../stores/ApiStore';
import * as Redoc from 'redoc';

const RedocPreview: React.FC = observer(() => {
  const apiStore = useApiStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderRedoc = async () => {
      if (containerRef.current) {
        // Clear existing content
        containerRef.current.innerHTML = '';
        
        try {
          // Validate the spec has required fields
          if (!apiStore.apiSpec.openapi || !apiStore.apiSpec.info || !apiStore.apiSpec.paths) {
            throw new Error('Invalid OpenAPI specification');
          }

          await Redoc.init(
            apiStore.apiSpec,
            {
              scrollYOffset: 50,
              hideDownloadButton: true,
              expandResponses: "200,201",
              theme: {
                colors: {
                  primary: {
                    main: '#2563eb'
                  }
                },
                typography: {
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  headings: {
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }
                },
                sidebar: {
                  backgroundColor: '#f3f4f6'
                }
              }
            },
            containerRef.current
          );
        } catch (error) {
          console.error('Failed to initialize Redoc:', error);
          if (containerRef.current) {
            containerRef.current.innerHTML = `
              <div class="p-4">
                <div class="bg-red-50 border border-red-200 rounded-md p-4">
                  <div class="text-red-800 font-medium">Error loading API documentation preview</div>
                  <div class="text-red-600 text-sm mt-1">
                    Please ensure your API specification is valid OpenAPI 3.0 format.
                  </div>
                </div>
              </div>
            `;
          }
        }
      }
    };

    renderRedoc();

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [apiStore.apiSpec]);

  return (
    <div 
      ref={containerRef} 
      className="bg-white rounded-lg shadow-inner min-h-[300px] overflow-auto"
    />
  );
});

export default RedocPreview;