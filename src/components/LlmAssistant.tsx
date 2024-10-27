import React, { useState } from 'react';
import { Send, Key } from 'lucide-react';
import OpenAI from 'openai';
import { observer } from 'mobx-react-lite';
import { useApiStore } from '../stores/ApiStore';
import QuickPrompts from './QuickPrompts';

const quickPrompts = [
  {
    title: 'Add Authentication',
    prompt: 'Add OAuth2 authentication to the API specification with JWT tokens.',
    icon: '🔒'
  },
  {
    title: 'Add Error Responses',
    prompt: 'Add standard error responses (400, 401, 403, 404, 500) to all endpoints.',
    icon: '⚠️'
  },
  {
    title: 'Add CRUD Endpoint',
    prompt: 'Add CRUD operations for a new resource to the API.',
    icon: '📝'
  },
  {
    title: 'Add Pagination',
    prompt: 'Add pagination parameters and response structure to GET endpoints.',
    icon: '📄'
  },
  {
    title: 'Add Search',
    prompt: 'Add search functionality with filtering and sorting parameters.',
    icon: '🔍'
  }
];

const extractJsonFromResponse = (response: string): string | null => {
  const jsonRegex = /{[\s\S]*}/;
  const match = response.match(jsonRegex);
  return match ? match[0] : null;
};

const LlmAssistant = observer(() => {
  const apiStore = useApiStore();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(!import.meta.env.VITE_OPENAI_API_KEY);

  const handlePromptSubmit = async (promptText: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const openai = new OpenAI({
        apiKey: apiKey || import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "You are an expert API designer assistant. Help the user design their OpenAPI specification. When suggesting changes, provide the full updated JSON structure for the relevant part of the specification." 
          },
          { 
            role: "user", 
            content: `Given this API specification: ${JSON.stringify(apiStore.apiSpec, null, 2)}\n\nUser question: ${promptText}` 
          }
        ],
      });

      const assistantResponse = completion.choices[0].message.content;
      setResponse(assistantResponse || '');

      const jsonContent = extractJsonFromResponse(assistantResponse || '');
      if (jsonContent) {
        const success = apiStore.updateSpecFromString(jsonContent);
        if (!success) {
          setError('Failed to apply the suggested changes. The response contained invalid OpenAPI specification.');
        }
      }
    } catch (error: any) {
      console.error('Error processing request:', error);
      if (error.message.includes('API key')) {
        setShowApiKeyInput(true);
        setError('Invalid or missing OpenAI API key. Please provide a valid API key.');
      } else {
        setError('An error occurred while processing your request. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setPrompt('');
      setShowQuickPrompts(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey && !import.meta.env.VITE_OPENAI_API_KEY) {
      setShowApiKeyInput(true);
      setError('Please provide an OpenAI API key to use the LLM assistant.');
      return;
    }
    if (prompt.trim()) {
      await handlePromptSubmit(prompt);
    }
  };

  const handleQuickPrompt = async (promptText: string) => {
    if (!apiKey && !import.meta.env.VITE_OPENAI_API_KEY) {
      setShowApiKeyInput(true);
      setError('Please provide an OpenAI API key to use the LLM assistant.');
      return;
    }
    await handlePromptSubmit(promptText);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Send className="mr-2" size={20} />
        LLM Assistant
      </h2>

      {showApiKeyInput && (
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Key size={16} className="mr-2" />
            <label htmlFor="apiKey" className="text-sm font-medium">
              OpenAI API Key
            </label>
          </div>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full p-2 border rounded mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500">
            Your API key is stored locally and never sent to our servers.
          </p>
        </div>
      )}

      <QuickPrompts
        prompts={quickPrompts}
        isLoading={isLoading}
        onPromptSelect={handleQuickPrompt}
        showQuickPrompts={showQuickPrompts}
        onTogglePrompts={() => setShowQuickPrompts(!showQuickPrompts)}
      />

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask the LLM for help with your API design..."
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? 'Processing...' : 'Send'}
        </button>
      </form>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {error}
        </div>
      )}

      {response && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">LLM Response:</h3>
          <pre className="whitespace-pre-wrap text-sm">{response}</pre>
        </div>
      )}
    </div>
  );
});

export default LlmAssistant;