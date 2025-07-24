export const questions = [
  {
    id: 'welcome',
    type: 'message',
    text: '👋 Olá! Bem-vindo à techFATTOcs.\n\nEstamos aqui para ajudá-lo a desenvolver software personalizado ou escalar sua equipe de tecnologia de forma eficiente.\n\nPodemos fazer algumas perguntas rápidas para entender melhor suas necessidades?',
    options: ['Sim, vamos lá!']
  },
  {
    id: 'name',
    type: 'input',
    text: 'Perfeito! Para começar, preciso de algumas informações.\n\nQual é o seu nome completo?',
    placeholder: 'Digite seu nome completo',
    field: 'name'
  },
  {
    id: 'email',
    type: 'input',
    text: 'Prazer em conhecê-lo! 👋\n\nQual é o seu email comercial?',
    placeholder: 'Digite seu email',
    inputType: 'email',
    field: 'email'
  },
  {
    id: 'phone',
    type: 'input',
    text: 'Qual é o seu número de telefone (com código do país)?',
    placeholder: '+55 11 99999-9999',
    field: 'phone'
  },
  {
    id: 'company',
    type: 'input',
    text: 'Legal! 😁 Estamos quase lá...\n\nQual é o nome da sua empresa?',
    placeholder: 'Digite o nome da empresa',
    field: 'company'
  },
  {
    id: 'teamSize',
    type: 'options',
    text: 'Qual é o tamanho atual da sua equipe?',
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
    id: 'needLevel',
    type: 'options',
    text: 'Como você avalia a necessidade da nossa solução para sua empresa?',
    options: [
      'Baixa',
      'Média',
      'Alta'
    ],
    field: 'needLevel'
  },
  {
    id: 'urgency',
    type: 'options',
    text: 'Com que urgência você acha que sua empresa precisa de uma solução como a nossa?',
    options: [
      'Imediato',
      'Curto prazo',
      'Médio prazo', 
      'Longo prazo'
    ],
    field: 'urgency'
  },
  {
    id: 'otherPeople',
    type: 'options',
    text: 'Existem outras pessoas na empresa que precisam saber sobre a solução?',
    options: [
      'Sim',
      'Não'
    ],
    field: 'otherPeople'
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

