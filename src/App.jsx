import { Zap, Layers, Zap as ZapIcon } from 'lucide-react';
import ChatPanel from './components/ChatPanel';
import CodeEditor from './components/CodeEditor';
import DiagramPreview from './components/DiagramPreview';
import BatchPanel from './components/BatchPanel';
import ProgressBar from './components/ProgressBar';
import { useAppStore } from './store/useAppStore';

function App() {
  const { mode, setMode } = useAppStore();

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">PULSE</h1>
              <p className="text-xs text-blue-100">PlantUML Script Engine</p>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setMode('single')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                mode === 'single'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <ZapIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Single Mode</span>
            </button>
            <button
              onClick={() => setMode('batch')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                mode === 'batch'
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="text-sm font-medium">Batch Mode</span>
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium">AI-Powered Diagram Studio</p>
            <p className="text-xs text-blue-100">Powered by Claude 3.5 Sonnet</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {mode === 'single' ? (
          <div className="h-full grid grid-cols-12 gap-0">
            {/* Chat Panel - Left */}
            <div className="col-span-3 h-full">
              <ChatPanel />
            </div>

            {/* Code Editor - Middle */}
            <div className="col-span-4 h-full">
              <CodeEditor />
            </div>

            {/* Preview Panel - Right */}
            <div className="col-span-5 h-full">
              <DiagramPreview />
            </div>
          </div>
        ) : (
          <div className="h-full">
            <BatchPanel />
          </div>
        )}
      </main>

      {/* Progress Bar */}
      <ProgressBar />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <p>Built with React, Vite, and Tailwind CSS</p>
          <p>PlantUML Server: {import.meta.env.VITE_PLANTUML_SERVER_URL || 'Public Server'}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
