# Arquitetura do Aplicativo techFATTOcs Chat

## Estrutura de Componentes

### Componentes Principais
1. **App.jsx** - Componente principal que gerencia o estado global
2. **ChatContainer** - Container principal do chat
3. **MessageBubble** - Componente de balão de mensagem
4. **InputField** - Campo de entrada para respostas do usuário
5. **TypingIndicator** - Indicador de digitação
6. **ProgressBar** - Barra de progresso das perguntas

### Componentes de UI
- **Button** (já disponível via shadcn/ui)
- **Input** (já disponível via shadcn/ui)
- **Card** (já disponível via shadcn/ui)

## Fluxo Conversacional

### Perguntas e Respostas
1. **Boas-vindas** - Apresentação da techFATTOcs
2. **Nome completo** - Input de texto
3. **Email** - Input de email com validação
4. **Telefone** - Input de telefone com máscara
5. **Nome da empresa** - Input de texto
6. **Tamanho da equipe** - Seleção múltipla
7. **Necessidade da solução** - Seleção múltipla
8. **Urgência** - Seleção múltipla
9. **Outras pessoas** - Sim/Não
10. **Finalização** - Mensagem de agradecimento

### Opções de Resposta
- **Tamanho da equipe**: 1-10, 11-25, 26-50, 51-100, 100+
- **Necessidade**: Baixa, Média, Alta
- **Urgência**: Imediato, Curto prazo, Médio prazo, Longo prazo
- **Outras pessoas**: Sim, Não

## Estado da Aplicação

```javascript
const [chatState, setChatState] = useState({
  currentStep: 0,
  isTyping: false,
  responses: {
    name: '',
    email: '',
    phone: '',
    company: '',
    teamSize: '',
    needLevel: '',
    urgency: '',
    otherPeople: ''
  },
  messages: []
});
```

## Integração com Agendor

### Dados a serem enviados
- Nome completo
- Email
- Telefone
- Nome da empresa
- Tamanho da equipe
- Nível de necessidade
- Urgência
- Outras pessoas envolvidas

### API Endpoint
- Será configurado para enviar os dados coletados ao Agendor via API REST

