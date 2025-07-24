import { User, Bot } from 'lucide-react';

const MessageBubble = ({ message, isBot = true }) => {
  return (
    <div
      className={`flex items-start gap-3 mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          isBot
            ? 'bg-gray-100 text-gray-800 rounded-bl-sm'
            : 'bg-blue-600 text-white rounded-br-sm'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;

