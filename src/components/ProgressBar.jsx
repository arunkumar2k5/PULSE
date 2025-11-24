import { useAppStore } from '../store/useAppStore';
import { CheckCircle2, Loader2, AlertCircle, Zap } from 'lucide-react';

const ProgressBar = () => {
  const { batchProgress } = useAppStore();
  const { total, current, currentItem, status } = batchProgress;

  if (status === 'idle') {
    return null;
  }

  const percentage = total > 0 ? (current / total) * 100 : 0;
  const isProcessing = status === 'processing';
  const isCompleted = status === 'completed';
  const isError = status === 'error';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50">
      <div className="px-6 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {isProcessing && (
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            )}
            {isCompleted && (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            )}
            {isError && (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                {isProcessing && 'Processing Batch Requirements'}
                {isCompleted && 'Batch Processing Completed!'}
                {isError && 'Processing Error'}
              </h3>
              <p className="text-xs text-gray-500">
                {isProcessing && `Processing: ${currentItem}`}
                {isCompleted && `Successfully processed ${total} requirements`}
                {isError && 'An error occurred during processing'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-800">
              {current} / {total}
            </p>
            <p className="text-xs text-gray-500">
              {percentage.toFixed(0)}% Complete
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          {/* Background Animation */}
          {isProcessing && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
                 style={{ 
                   backgroundSize: '200% 100%',
                   animation: 'shimmer 2s infinite'
                 }} 
            />
          )}
          
          {/* Progress Fill */}
          <div
            className={`h-full transition-all duration-500 ease-out ${
              isCompleted
                ? 'bg-gradient-to-r from-green-500 to-green-600'
                : isError
                ? 'bg-gradient-to-r from-red-500 to-red-600'
                : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
            }`}
            style={{ width: `${percentage}%` }}
          >
            {/* Animated Pulse Effect */}
            {isProcessing && (
              <div className="h-full w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            )}
          </div>

          {/* Sparkle Effect for Completed */}
          {isCompleted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white animate-bounce" />
            </div>
          )}
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-1 mt-3">
          {Array.from({ length: Math.min(total, 10) }).map((_, idx) => {
            const itemNumber = Math.floor((idx / 10) * total) + 1;
            const isActive = current >= itemNumber;
            return (
              <div
                key={idx}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Add shimmer animation styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
