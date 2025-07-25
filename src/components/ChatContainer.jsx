import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatContainer = ({ messages, isTyping, children }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <a href="https://tech.fattocs.com" target="_blank" rel="noopener noreferrer">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <img
              src="https://tech.fattocs.com/wp-content/uploads/2025/04/logo_fatto_1-1.png"
              alt="Logo FATTO"
              className="w-8 h-8 object-contain"
            />
          </div>
        </a>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-semibold text-gray-900">techFATTOcs</h2>
              <p className="text-sm text-gray-500">
                Nós Desenvolvemos Equipes Tech Remotas de Alto Desempenho
              </p>
            </div>
            <a
              href="https://www.fattocs.com/politica-de-privacidade/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 underline whitespace-nowrap ml-4"
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>


      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 chat-background relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto"
          style={{ zIndex: 2 }}
        >
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message.text}
              isBot={message.isBot}
              delay={index * 0.1}
            />
          ))}

          {isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </motion.div>
      </div>

      {/* Input Area */}
      {children && (
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-2xl mx-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;

