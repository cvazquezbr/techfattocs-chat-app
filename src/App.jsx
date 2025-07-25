import { useState, useEffect } from 'react';
import ChatContainer from './components/ChatContainer';
import InputField from './components/InputField';
import ProgressBar from './components/ProgressBar';
import { questions, getQuestionById, getNextQuestionId } from './data/questions';
import { createAgendorService } from './services/agendorService';
import './App.css';

// Token da API do Agendor (em produção, isso deveria vir de variáveis de ambiente)
const AGENDOR_API_TOKEN = import.meta.env.VITE_AGENDOR_API_TOKEN || null;
function App() {
  const [currentQuestionId, setCurrentQuestionId] = useState('welcome');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [responses, setResponses] = useState({
    name: '',
    need: '',
    selfAssessment: '',
    email: '',
    phone: '',
    teamSize: '',
  });
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = getQuestionById(currentQuestionId);
  const currentQuestionIndex = questions.findIndex(q => q.id === currentQuestionId);
  const totalQuestions = questions.length;

  useEffect(() => {
    // Adiciona a primeira mensagem após um pequeno delay
    const timer = setTimeout(() => {
      addBotMessage(currentQuestion.text);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const addBotMessage = (text) => {
    setIsTyping(true);
    
    // Simula tempo de digitação
    setTimeout(() => {
      setMessages(prev => [...prev, { text, isBot: true }]);
      setIsTyping(false);
    }, 300 + text.length * 20); // Tempo baseado no tamanho da mensagem
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { text, isBot: false }]);
  };

  const handleResponse = (response) => {
    addUserMessage(response);

    // Salva a resposta se for um campo de dados
    if (currentQuestion.field) {
      setResponses(prev => ({
        ...prev,
        [currentQuestion.field]: response
      }));
    }

    // Avança para a próxima pergunta
    const nextQuestionId = getNextQuestionId(currentQuestionId);
    
    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId);
      const nextQuestion = getQuestionById(nextQuestionId);
      
      // Adiciona a próxima pergunta após um delay
      setTimeout(async () => {
        if (nextQuestion.isFinish) {
          setIsFinished(true);
          
          // Enviar dados para o Agendor
          try {
            const agendorService = createAgendorService(AGENDOR_API_TOKEN);
            if (agendorService) {
              const updatedResponses = {
                ...responses,
                [currentQuestion.field]: response
              };
              
              await agendorService.sendLead(updatedResponses);
              console.log('Lead enviado com sucesso para o Agendor!');
            } else {
              console.log('Dados coletados (Agendor não configurado):', {
                ...responses,
                [currentQuestion.field]: response
              });
            }
          } catch (error) {
            console.error('Erro ao enviar lead para o Agendor:', error);
            // Em caso de erro, ainda mostra a mensagem de finalização
          }
        }
        addBotMessage(nextQuestion.text);
      }, 1000);
    }
  };

  const getInputComponent = () => {
    if (isFinished) {
      return null;
    }

    // Se a pergunta tem opções, mostra as opções
    if (currentQuestion.options) {
      return (
        <InputField
          options={currentQuestion.options}
          onSubmit={handleResponse}
          disabled={isTyping}
        />
      );
    }

    // Se é uma mensagem sem opções, não mostra input
    if (currentQuestion.type === 'message') {
      return null;
    }

    // Para inputs de texto
    return (
      <InputField
        type={currentQuestion.inputType || 'text'}
        placeholder={currentQuestion.placeholder}
        onSubmit={handleResponse}
        disabled={isTyping}
      />
    );
  };

  return (
    <div className="h-screen">
      <div className="h-full max-w-4xl mx-auto shadow-lg">
        {/* Progress Bar */}
        {!isFinished && currentQuestion.type !== 'message' && (
          <div className="p-4 border-b">
            <ProgressBar 
              current={currentQuestionIndex} 
              total={totalQuestions - 2} // Exclui welcome e finish
            />
          </div>
        )}

        <ChatContainer 
          messages={messages} 
          isTyping={isTyping}
        >
          {getInputComponent()}
        </ChatContainer>
      </div>
    </div>
  );
}

export default App;