# techFATTOcs - Aplicativo Conversacional

Um aplicativo React JS com interface de chat conversacional para coleta de dados de leads da techFATTOcs, com integração ao Agendor CRM.

## 🚀 Características

- **Interface Conversacional**: Experiência de chat com balões de mensagem e animações
- **Fluxo Inteligente**: Perguntas sequenciais com validação de entrada
- **Integração Agendor**: Envio automático de leads para o CRM
- **Design Responsivo**: Funciona em desktop e mobile
- **Animações Suaves**: Indicadores de digitação e transições fluidas

## 📋 Fluxo de Perguntas

1. **Boas-vindas** - Apresentação da techFATTOcs
2. **Nome completo** - Captura do nome do lead
3. **Email comercial** - Validação de email
4. **Telefone** - Número com código do país
5. **Nome da empresa** - Empresa do lead
6. **Tamanho da equipe** - Opções múltiplas (1-10, 11-25, 26-50, 51-100, 100+)
7. **Nível de necessidade** - Baixa, Média, Alta
8. **Urgência** - Imediato, Curto prazo, Médio prazo, Longo prazo
9. **Outras pessoas** - Sim/Não
10. **Finalização** - Mensagem de agradecimento

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **shadcn/ui** - Componentes de UI

## 📁 Estrutura do Projeto

```
techfattocs-chat-app/
├── public/
├── src/
│   ├── components/
│   │   ├── ChatContainer.jsx      # Container principal do chat
│   │   ├── MessageBubble.jsx      # Componente de balão de mensagem
│   │   ├── InputField.jsx         # Campo de entrada
│   │   ├── TypingIndicator.jsx    # Indicador de digitação
│   │   └── ProgressBar.jsx        # Barra de progresso
│   ├── data/
│   │   └── questions.js           # Configuração das perguntas
│   ├── services/
│   │   └── agendorService.js      # Integração com API do Agendor
│   ├── App.jsx                    # Componente principal
│   ├── App.css                    # Estilos globais
│   └── main.jsx                   # Ponto de entrada
├── .env.example                   # Exemplo de variáveis de ambiente
├── ARCHITECTURE.md                # Documentação da arquitetura
└── README.md                      # Este arquivo
```

## ⚙️ Configuração

### 1. Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd techfattocs-chat-app

# Instalar dependências
pnpm install
```

### 2. Configuração do Agendor

1. Acesse sua conta no Agendor
2. Vá em **Integrações** → **API**
3. Copie seu token de API
4. Crie um arquivo `.env` baseado no `.env.example`:

```env
REACT_APP_AGENDOR_TOKEN=seu_token_aqui
```

### 3. Execução

```bash
# Desenvolvimento
pnpm run dev

# Build para produção
pnpm run build

# Preview da versão de produção
pnpm run preview
```

## 🔧 Integração com Agendor

O aplicativo utiliza a API REST do Agendor para:

- **Criar/Atualizar Pessoas**: Usando o endpoint `/people/upsert`
- **Evitar Duplicatas**: Busca por email antes de criar
- **Campos Customizados**: Armazena dados específicos do formulário
- **Tratamento de Erros**: Logs detalhados e fallbacks

### Dados Enviados

```javascript
{
  name: "Nome do Lead",
  contact: {
    email: "email@empresa.com",
    work: "(11)999999999"
  },
  organization: {
    name: "Nome da Empresa"
  },
  description: "Lead gerado via formulário techFATTOcs...",
  customFields: {
    tamanho_equipe: "51 - 100",
    nivel_necessidade: "Alta",
    urgencia: "Curto prazo",
    outras_pessoas: "Sim"
  }
}
```

## 🎨 Personalização

### Cores e Tema

As cores podem ser ajustadas no arquivo `src/App.css`:

```css
:root {
  --primary: oklch(0.205 0 0);      /* Azul escuro */
  --primary-foreground: oklch(0.985 0 0); /* Branco */
  --background: oklch(1 0 0);        /* Branco */
  --foreground: oklch(0.145 0 0);    /* Preto */
}
```

### Perguntas

Para modificar as perguntas, edite o arquivo `src/data/questions.js`:

```javascript
{
  id: 'nova_pergunta',
  type: 'input', // ou 'options' ou 'message'
  text: 'Sua pergunta aqui?',
  placeholder: 'Digite sua resposta...',
  field: 'campo_resposta'
}
```

## 🚀 Deploy

### Opção 1: Build Estático

```bash
pnpm run build
# Arquivos gerados em /dist
```

### Opção 2: Vercel/Netlify

1. Conecte seu repositório
2. Configure as variáveis de ambiente
3. Deploy automático

### Opção 3: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📊 Monitoramento

O aplicativo inclui logs detalhados:

- **Console.log**: Dados coletados e status de envio
- **Error Handling**: Tratamento de erros da API
- **Validação**: Verificação de campos obrigatórios

## 🔒 Segurança

- **Validação Client-side**: Campos obrigatórios e formatos
- **Sanitização**: Limpeza de dados antes do envio
- **HTTPS**: Comunicação segura com APIs
- **Tokens**: Armazenamento seguro de credenciais

## 🐛 Solução de Problemas

### Erro de Integração com Agendor

1. Verifique se o token está correto
2. Confirme se a API está ativa na sua conta
3. Verifique os logs no console do navegador

### Problemas de Build

1. Limpe o cache: `pnpm run build --force`
2. Reinstale dependências: `rm -rf node_modules && pnpm install`
3. Verifique a versão do Node.js (recomendado: 18+)

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique a documentação da API do Agendor
2. Consulte os logs no console do navegador
3. Entre em contato com a equipe de desenvolvimento

## 📄 Licença

Este projeto foi desenvolvido especificamente para a techFATTOcs.

---

**Desenvolvido com ❤️ para a techFATTOcs**

