import { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Eye, Download, ZoomIn, ZoomOut, RotateCcw, Loader2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { getPlantUMLImageUrl, downloadPlantUML, downloadPlantUMLCode } from '../services/plantUmlService';

export default function DiagramPreview() {
  const { plantUmlCode } = useAppStore();
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  useEffect(() => {
    if (!plantUmlCode.trim()) {
      setImageUrl('');
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const url = getPlantUMLImageUrl(plantUmlCode, 'svg');
      setImageUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [plantUmlCode]);

  const handleDownload = async (format) => {
    setShowDownloadMenu(false);
    try {
      if (format === 'puml') {
        downloadPlantUMLCode(plantUmlCode);
      } else {
        await downloadPlantUML(plantUmlCode, format);
      }
    } catch (err) {
      alert(`Download failed: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header - Fixed at top */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-600" />
          <h2 className="font-semibold text-gray-800">Live Preview</h2>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowDownloadMenu(!showDownloadMenu)}
            disabled={!imageUrl}
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          
          {showDownloadMenu && imageUrl && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <button
                onClick={() => handleDownload('svg')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
              >
                Download SVG
              </button>
              <button
                onClick={() => handleDownload('png')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
              >
                Download PNG
              </button>
              <button
                onClick={() => handleDownload('puml')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
              >
                Download Code
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Preview Area - Scrollable */}
      <div className="flex-1 overflow-auto relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Rendering diagram...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center max-w-md">
              <div className="text-red-500 mb-2">⚠️</div>
              <p className="text-sm text-red-600 font-medium mb-1">Rendering Error</p>
              <p className="text-xs text-gray-600">{error}</p>
            </div>
          </div>
        ) : !imageUrl ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Your diagram will appear here</p>
            </div>
          </div>
        ) : (
          <TransformWrapper
            initialScale={1}
            minScale={0.1}
            maxScale={5}
            centerOnInit={true}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                {/* Zoom Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <button
                    onClick={() => zoomIn()}
                    className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => zoomOut()}
                    className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => resetTransform()}
                    className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
                    title="Reset"
                  >
                    <RotateCcw className="w-4 h-4 text-gray-700" />
                  </button>
                </div>

                {/* Diagram */}
                <TransformComponent
                  wrapperStyle={{
                    width: '100%',
                    height: '100%',
                  }}
                  contentStyle={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="PlantUML Diagram"
                    className="max-w-full max-h-full object-contain"
                    onError={() => setError('Failed to load diagram image')}
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        )}
      </div>
    </div>
  );
}
