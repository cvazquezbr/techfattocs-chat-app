import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div
      className="flex items-start gap-3 mb-4"
    >
      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
        <Bot className="w-4 h-4 text-white" />
      </div>
      
      <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
          <div
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
          <div
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;

