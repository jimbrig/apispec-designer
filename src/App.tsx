import React from 'react';
import { observer } from 'mobx-react-lite';
import Header from './components/Header';
import ApiSpecification from './components/ApiSpecification';
import LlmAssistant from './components/LlmAssistant';
import ApiDocViewer from './components/ApiDocViewer';
import ViewerSelector from './components/ViewerSelector';
import StructuredEditor from './components/StructuredEditor';
import SpecViewer from './components/SpecViewer';

const App = observer(() => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left Column - Editor & Structure */}
          <div className="space-y-6">
            {/* API Editor Tabs */}
            <div className="bg-white rounded-lg shadow-lg">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button className="px-4 py-2 text-sm font-medium text-gray-900 border-b-2 border-blue-600">
                    Code Editor
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Visual Editor
                  </button>
                </nav>
              </div>
              <ApiSpecification />
            </div>
            
            {/* Structured View */}
            <SpecViewer />
          </div>

          {/* Right Column - Assistant & Preview */}
          <div className="space-y-6">
            {/* LLM Assistant */}
            <div className="bg-white rounded-lg shadow-lg">
              <LlmAssistant />
            </div>
            {/* Documentation Preview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <ViewerSelector />
              <ApiDocViewer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

export default App;