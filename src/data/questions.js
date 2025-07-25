export const questions = [
  {
    id: 'welcome',
    type: 'message',
    text: `👋 Olá! Bem-vindo à techFATTOcs.

Estamos aqui para ajudá-lo a desenvolver aplicações personalizadas ou escalar sua equipe de tecnologia de forma eficiente.

Podemos fazer algumas perguntas rápidas para entender melhor suas necessidades?

🔒 Suas informações estão protegidas pela nossa Política de Privacidade.`,
    options: ['Sim, vamos lá!']
  },
  {
    id: 'name',
    type: 'input',
    text: 'Perfeito! Para começar, por qual nome posso te chamar?',
    placeholder: '',
    field: 'name'
  },
 {
    id: 'need',
    type: 'input',
    text: 'Prazer em conhecê-lo! 👋\n\nPara poder melhor te atender, você poderia resumir o que pretende atingir... qual sua necessidade?',
    placeholder: '',
    field: 'need'
  },
  {
    id: 'selfAssessment',
    type: 'options',
    text: 'Se tivesse de escolher uma opção, qual delas melhor descreveria sua situação atual?',
    options: [
      'Capacidade interna de gestão de equipes técnicas',
      'Visão para um App ou solução digital', 
      'Já há uma especificação de solução',
      'Muito trabalho manual, apesar (ou porque) de muitas aplicações',
    ],
    field: 'selfAssessment'
  },
  {
    id: 'email',
    type: 'input',
    text: 'Qual é o seu email comercial?',
    placeholder: '',
    inputType: 'email',
    field: 'email'
  },
  {
    id: 'phone',
    type: 'input',
    text: 'Qual é o seu número de telefone?',
    placeholder: '(11)99999-9999',
    field: 'phone'
  },
  {
    id: 'teamSize',
    type: 'options',
    text: 'Legal! 😁 Estamos quase lá...\n\nQual é o tamanho atual da sua equipe?',
    options: [
      '1 - 10',
      '11 - 25', 
      '26 - 50',
      '51 - 100',
      'Mais de 100'
    ],
    field: 'teamSize'
  },
  {
    id: 'finish',
    type: 'message',
    text: 'Obrigado! Nossa equipe de consultores entrará em contato em breve para fornecer o melhor orçamento para suas necessidades 🤝',
    isFinish: true
  }
];

export const getQuestionById = (id) => {
  return questions.find(q => q.id === id);
};

export const getNextQuestionId = (currentId) => {
  const currentIndex = questions.findIndex(q => q.id === currentId);
  if (currentIndex < questions.length - 1) {
    return questions[currentIndex + 1].id;
  }
  return null;
};

