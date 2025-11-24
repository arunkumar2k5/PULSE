import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MessageSquare, Trash2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { generatePlantUML } from '../services/llmService';

export default function ChatPanel() {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  
  const { 
    messages, 
    addMessage, 
    clearMessages,
    isGenerating, 
    setIsGenerating,
    setPlantUmlCode,
    error,
    setError,
    clearError
  } = useAppStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage = input.trim();
    setInput('');
    clearError();

    // Add user message
    addMessage({
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    });

    setIsGenerating(true);

    try {
      const plantUmlCode = await generatePlantUML(userMessage);
      
      // Add assistant message
      addMessage({
        role: 'assistant',
        content: 'Generated PlantUML diagram successfully!',
        code: plantUmlCode,
        timestamp: new Date().toISOString()
      });

      // Update the editor
      setPlantUmlCode(plantUmlCode);
    } catch (err) {
      setError(err.message);
      addMessage({
        role: 'assistant',
        content: `Error: ${err.message}`,
        timestamp: new Date().toISOString(),
        isError: true
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear all chat messages?')) {
      clearMessages();
      clearError();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 border-r border-gray-200">
      {/* Header - Fixed at top */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-800">AI Assistant</h2>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Input Form - Fixed at top */}
      <div className="flex-shrink-0 p-4 bg-white border-b border-gray-200">
        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your diagram..."
            disabled={isGenerating}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>

      {/* Messages - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 px-4">
            <MessageSquare className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-sm">Start by describing the diagram you want to create</p>
            <p className="text-xs mt-2">Example: "Create a sequence diagram for a login flow"</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.isError
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.code && (
                  <div className="mt-2 text-xs opacity-75">
                    <code className="bg-black/10 px-2 py-1 rounded">PlantUML code generated</code>
                  </div>
                )}
                <p className="text-xs mt-1 opacity-60">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        {isGenerating && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Generating diagram...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
