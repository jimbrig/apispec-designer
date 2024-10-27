import React from 'react';
import { Book } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useApiStore } from '../stores/ApiStore';

const Header = observer(() => {
  const apiStore = useApiStore();
  const logo = apiStore.apiSpec.info?.['x-logo'];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {logo?.url ? (
              <img
                src={logo.url}
                alt={logo.altText || apiStore.apiSpec.info.title}
                className="h-8 w-auto object-contain"
                style={logo.backgroundColor ? { backgroundColor: logo.backgroundColor } : undefined}
              />
            ) : (
              <Book className="text-blue-600" size={32} />
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {apiStore.apiSpec.info.title}
              </h1>
              <p className="text-sm text-gray-500">
                Version {apiStore.apiSpec.info.version}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://swagger.io/specification/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              OpenAPI Spec
            </a>
            <a
              href="https://github.com/OAI/OpenAPI-Specification"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;