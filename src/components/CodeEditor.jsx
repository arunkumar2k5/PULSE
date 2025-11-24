import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Code2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function CodeEditor() {
  const { plantUmlCode, setPlantUmlCode } = useAppStore();
  const editorRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value) => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce: wait 500ms after user stops typing
    timeoutRef.current = setTimeout(() => {
      setPlantUmlCode(value || '');
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header - Fixed at top */}
      <div className="flex-shrink-0 flex items-center gap-2 p-4 border-b border-gray-200 bg-gray-50">
        <Code2 className="w-5 h-5 text-green-600" />
        <h2 className="font-semibold text-gray-800">PlantUML Editor</h2>
      </div>

      {/* Editor - Scrollable area */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="plaintext"
          value={plantUmlCode}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            wrappingIndent: 'indent',
            formatOnPaste: true,
            formatOnType: true,
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
          }}
        />
      </div>
    </div>
  );
}
