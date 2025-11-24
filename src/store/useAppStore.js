import { create } from 'zustand';

const DEFAULT_PLANTUML = `@startuml
Alice -> Bob: Hello
Bob -> Alice: Hi there!
@enduml`;

export const useAppStore = create((set) => ({
  // PlantUML Code
  plantUmlCode: DEFAULT_PLANTUML,
  setPlantUmlCode: (code) => set({ plantUmlCode: code }),

  // Chat Messages
  messages: [],
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  clearMessages: () => set({ messages: [] }),

  // Loading States
  isGenerating: false,
  setIsGenerating: (isGenerating) => set({ isGenerating }),

  isRendering: false,
  setIsRendering: (isRendering) => set({ isRendering }),

  // Error Handling
  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Mode Selection (Single or Batch)
  mode: 'single', // 'single' or 'batch'
  setMode: (mode) => set({ mode }),

  // Batch Processing State
  batchData: [],
  setBatchData: (data) => set({ batchData: data }),
  
  batchProgress: {
    total: 0,
    current: 0,
    currentItem: '',
    status: 'idle', // 'idle', 'processing', 'completed', 'error'
  },
  setBatchProgress: (progress) => set((state) => ({
    batchProgress: { ...state.batchProgress, ...progress }
  })),
  resetBatchProgress: () => set({
    batchProgress: {
      total: 0,
      current: 0,
      currentItem: '',
      status: 'idle',
    }
  }),

  outputFolder: '',
  setOutputFolder: (folder) => set({ outputFolder: folder }),
}));
