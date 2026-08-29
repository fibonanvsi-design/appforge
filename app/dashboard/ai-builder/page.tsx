'use client';

import { useState } from 'react';
import { FiSend, FiCode, FiCheck, FiX } from 'react-icons/fi';

export default function AIBuilderPage() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMessage = prompt.trim();
    setPrompt('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'error', 
          content: data.error || 'Failed to generate response' 
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'error', 
        content: 'An error occurred while generating response' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const examplePrompts = [
    'Create a landing page for a SaaS product',
    'Build a dashboard with charts and statistics',
    'Generate a contact form with validation',
    'Create a blog post component with author info',
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AI Builder</h1>
        <p className="text-gray-400">Let AI help you build your application</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-lg flex flex-col h-[600px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <FiCode className="text-6xl text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Start Building with AI
                </h3>
                <p className="text-gray-400 mb-6 max-w-md">
                  Describe what you want to build, and AI will help you generate the code.
                </p>
                <div className="grid grid-cols-1 gap-2 w-full max-w-md">
                  {examplePrompts.slice(0, 2).map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(example)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors text-left"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : message.role === 'error'
                        ? 'bg-red-500/20 border border-red-500 text-red-400'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                    {message.role === 'assistant' && (
                      <div className="mt-3 pt-3 border-t border-gray-600 flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors">
                          <FiCheck className="text-sm" />
                          Apply
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded transition-colors">
                          <FiCode className="text-sm" />
                          Copy Code
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="animate-bounce">●</div>
                    <div className="animate-bounce delay-100">●</div>
                    <div className="animate-bounce delay-200">●</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-700 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to build..."
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <FiSend />
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Examples */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Examples</h3>
            <div className="space-y-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example)}
                  className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors text-left"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Tips</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Be specific about what you want to create</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Mention the framework or library you prefer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Describe the styling or design you want</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Ask for explanations if needed</span>
              </li>
            </ul>
          </div>

          {/* Status */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-400 text-sm">
              <FiCode />
              <span className="font-medium">AI Assistant Active</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Powered by advanced language models
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
