
import React, { useState, useEffect } from 'react';

interface ApiKeysModalProps {
  onClose: () => void;
}

const ApiKeysModal: React.FC<ApiKeysModalProps> = ({ onClose }) => {
  const [provider, setProvider] = useState('gemini');
  const [geminiKey, setGeminiKey] = useState('');
  const [openRouterKey, setOpenRouterKey] = useState('');
  const [openRouterModel, setOpenRouterModel] = useState('google/gemini-flash-1.5');

  useEffect(() => {
    setGeminiKey(localStorage.getItem('gemini_api_key') || '');
    setOpenRouterKey(localStorage.getItem('openrouter_api_key') || '');
    setOpenRouterModel(localStorage.getItem('openrouter_model') || 'google/gemini-flash-1.5');
    const savedProvider = localStorage.getItem('api_provider');
    if (savedProvider) {
      setProvider(savedProvider);
    }
  }, []);

  const handleSave = () => {
    if (provider === 'gemini') {
      localStorage.setItem('gemini_api_key', geminiKey);
      localStorage.removeItem('openrouter_api_key');
    } else {
      localStorage.setItem('openrouter_api_key', openRouterKey);
      localStorage.setItem('openrouter_model', openRouterModel);
      localStorage.removeItem('gemini_api_key');
    }
    localStorage.setItem('api_provider', provider);
    onClose();
  };
  
  const openRouterFreeModels = [
    "google/gemini-flash-1.5",
    "mistralai/mistral-7b-instruct",
    "nousresearch/nous-hermes-2-mistral-7b-dpo",
    "huggingfaceh4/zephyr-7b-beta",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold mb-4 text-white">API Key Configuration</h2>
        <p className="text-gray-400 mb-6">Select your AI provider and enter the required keys.</p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Provider</label>
          <select 
            value={provider} 
            onChange={(e) => setProvider(e.target.value)} 
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="gemini">Google Gemini</option>
            <option value="openrouter">OpenRouter</option>
          </select>
        </div>

        {provider === 'gemini' ? (
          <div>
            <label htmlFor="gemini-key" className="block text-sm font-medium text-gray-300 mb-2">Gemini API Key</label>
            <input
              id="gemini-key"
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Gemini API Key"
            />
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label htmlFor="openrouter-key" className="block text-sm font-medium text-gray-300 mb-2">OpenRouter API Key</label>
              <input
                id="openrouter-key"
                type="password"
                value={openRouterKey}
                onChange={(e) => setOpenRouterKey(e.target.value)}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your OpenRouter API Key"
              />
            </div>
            <div>
              <label htmlFor="openrouter-model" className="block text-sm font-medium text-gray-300 mb-2">Model (Free Models)</label>
              <select
                id="openrouter-model"
                value={openRouterModel}
                onChange={(e) => setOpenRouterModel(e.target.value)}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {openRouterFreeModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500 transition-colors duration-200"
          >
            Close
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeysModal;
