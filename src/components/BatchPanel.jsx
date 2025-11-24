import { useState, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { 
  Upload, 
  FolderOpen, 
  Play, 
  FileSpreadsheet, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Download,
  Trash2
} from 'lucide-react';
import { parseExcelFile, processBatchRequirements } from '../services/batchService';

const BatchPanel = () => {
  const {
    batchData,
    setBatchData,
    setBatchProgress,
    resetBatchProgress,
    outputFolder,
    setOutputFolder,
  } = useAppStore();

  const [excelFile, setExcelFile] = useState(null);
  const [parseError, setParseError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState([]);
  
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setExcelFile(file);
    setParseError(null);
    setBatchData([]);
    setResults([]);
    resetBatchProgress();

    try {
      const requirements = await parseExcelFile(file);
      setBatchData(requirements);
    } catch (error) {
      setParseError(error.message);
      setExcelFile(null);
    }
  };

  const handleFolderSelect = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // Get the path from the first file
      const path = files[0].webkitRelativePath || files[0].path;
      const folderPath = path.substring(0, path.lastIndexOf('/'));
      setOutputFolder(folderPath || 'Selected Folder');
    }
  };

  const handleStartProcessing = async () => {
    if (batchData.length === 0) {
      alert('Please upload an Excel file first');
      return;
    }

    setIsProcessing(true);
    resetBatchProgress();
    setResults([]);

    try {
      const processedResults = await processBatchRequirements(
        batchData,
        outputFolder,
        (progress) => {
          setBatchProgress(progress);
        }
      );
      setResults(processedResults);
    } catch (error) {
      console.error('Batch processing error:', error);
      setBatchProgress({ status: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setExcelFile(null);
    setParseError(null);
    setBatchData([]);
    setResults([]);
    resetBatchProgress();
    setOutputFolder('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (folderInputRef.current) folderInputRef.current.value = '';
  };

  const successCount = results.filter(r => r.success).length;
  const errorCount = results.filter(r => !r.success).length;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FileSpreadsheet className="w-6 h-6 text-blue-600" />
          Batch Processing Mode
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Upload an Excel file with requirements to generate multiple PlantUML diagrams
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Step 1: Upload Excel File */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Upload Excel File
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Excel file must contain columns: <strong>SYS ID</strong> (Column B) and <strong>SYS Requirement</strong> (Column C)
                </p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="excel-upload"
                />
                <label
                  htmlFor="excel-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Choose Excel File
                </label>

                {excelFile && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800">{excelFile.name}</p>
                      <p className="text-xs text-green-600">{batchData.length} requirements found</p>
                    </div>
                  </div>
                )}

                {parseError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <p className="text-sm text-red-800">{parseError}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Step 2: Select Output Folder */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Select Output Folder
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Choose where to save the generated PlantUML files and diagrams
                </p>
                
                <div className="flex items-center gap-3">
                  <input
                    ref={folderInputRef}
                    type="file"
                    webkitdirectory=""
                    directory=""
                    multiple
                    onChange={handleFolderSelect}
                    className="hidden"
                    id="folder-select"
                  />
                  <label
                    htmlFor="folder-select"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors"
                  >
                    <FolderOpen className="w-4 h-4" />
                    Choose Folder
                  </label>
                  
                  {outputFolder && (
                    <div className="flex-1 p-2 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-sm text-purple-800 truncate">{outputFolder}</p>
                    </div>
                  )}
                </div>

                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <p className="text-xs text-yellow-800">
                    <strong>Note:</strong> Due to browser security restrictions, files will be downloaded to your default Downloads folder. 
                    You can organize them into your preferred folder after download.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Preview Requirements */}
          {batchData.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Requirements Preview
                  </h3>
                  <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 text-left font-semibold text-gray-700">SYS ID</th>
                          <th className="px-4 py-2 text-left font-semibold text-gray-700">Requirement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {batchData.map((req, idx) => (
                          <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-2 font-mono text-xs">{req.id}</td>
                            <td className="px-4 py-2 text-xs text-gray-600">{req.requirement.substring(0, 100)}...</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleStartProcessing}
              disabled={batchData.length === 0 || isProcessing}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5" />
              {isProcessing ? 'Processing...' : 'Start Batch Processing'}
            </button>

            <button
              onClick={handleReset}
              disabled={isProcessing}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Reset
            </button>
          </div>

          {/* Results Summary */}
          {results.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Processing Results</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">{results.length}</p>
                  <p className="text-sm text-gray-600">Total Processed</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">{successCount}</p>
                  <p className="text-sm text-gray-600">Successful</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-600">{errorCount}</p>
                  <p className="text-sm text-gray-600">Failed</p>
                </div>
              </div>

              {errorCount > 0 && (
                <div className="max-h-48 overflow-y-auto border border-red-200 rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-red-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-red-700">Failed ID</th>
                        <th className="px-4 py-2 text-left font-semibold text-red-700">Error</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.filter(r => !r.success).map((result, idx) => (
                        <tr key={idx} className="border-t border-red-200">
                          <td className="px-4 py-2 font-mono text-xs">{result.id}</td>
                          <td className="px-4 py-2 text-xs text-red-600">{result.error}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BatchPanel;
