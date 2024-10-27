import React from 'react';
import { Plus, Sparkles } from 'lucide-react';

export interface QuickPrompt {
  title: string;
  prompt: string;
  icon: string;
}

interface QuickPromptsProps {
  prompts: QuickPrompt[];
  isLoading: boolean;
  onPromptSelect: (prompt: string) => void;
  showQuickPrompts: boolean;
  onTogglePrompts: () => void;
}

const QuickPrompts: React.FC<QuickPromptsProps> = ({
  prompts,
  isLoading,
  onPromptSelect,
  showQuickPrompts,
  onTogglePrompts,
}) => {
  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={onTogglePrompts}
          className="flex items-center px-3 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          {showQuickPrompts ? <Sparkles size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showQuickPrompts ? 'Hide Prompts' : 'Quick Prompts'}
        </button>
      </div>

      {showQuickPrompts && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          {prompts.map((quickPrompt) => (
            <button
              key={quickPrompt.title}
              onClick={() => onPromptSelect(quickPrompt.prompt)}
              disabled={isLoading}
              className="flex items-center p-3 text-left rounded-md bg-white hover:bg-gray-50 border border-gray-200 transition-colors"
            >
              <span className="text-xl mr-2">{quickPrompt.icon}</span>
              <div>
                <div className="font-medium text-sm">{quickPrompt.title}</div>
                <div className="text-xs text-gray-500">{quickPrompt.prompt}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default QuickPrompts;