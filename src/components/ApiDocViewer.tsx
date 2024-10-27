import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useApiStore } from '../stores/ApiStore';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { RedocStandalone } from 'redoc';

const ApiDocViewer: React.FC = observer(() => {
  const apiStore = useApiStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderViewer = async () => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = '';

      try {
        switch (apiStore.selectedViewer) {
          case 'redoc':
            const root = document.createElement('div');
            containerRef.current.appendChild(root);
            const reactRoot = await import('react-dom/client').then(m => m.createRoot(root));
            reactRoot.render(
              <RedocStandalone
                spec={apiStore.apiSpec}
                options={{
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
                }}
              />
            );
            break;

          case 'swagger':
            const swaggerRoot = document.createElement('div');
            containerRef.current.appendChild(swaggerRoot);
            const swaggerReactRoot = await import('react-dom/client').then(m => m.createRoot(swaggerRoot));
            swaggerReactRoot.render(
              <SwaggerUI 
                spec={apiStore.apiSpec}
                docExpansion="list"
                defaultModelsExpandDepth={-1}
              />
            );
            break;

          case 'rapidoc':
            const rapidocRoot = document.createElement('div');
            containerRef.current.appendChild(rapidocRoot);
            rapidocRoot.innerHTML = `
              <div class="p-4">
                <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div class="text-yellow-800 font-medium">RapiDoc Viewer</div>
                  <div class="text-yellow-600 text-sm mt-1">
                    RapiDoc viewer is currently unavailable. Please use Redoc or Swagger UI instead.
                  </div>
                </div>
              </div>
            `;
            break;
        }
      } catch (error) {
        console.error('Failed to initialize API documentation viewer:', error);
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
    };

    renderViewer();

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [apiStore.apiSpec, apiStore.selectedViewer]);

  return (
    <div 
      ref={containerRef} 
      className="bg-white rounded-lg shadow-inner min-h-[300px] overflow-auto"
      style={{ maxHeight: 'calc(100vh - 400px)' }}
    />
  );
});

export default ApiDocViewer;