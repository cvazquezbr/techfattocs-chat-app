// Serviço de integração com a API do Agendor
class AgendorService {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${apiToken}`
    };
  }

  // Criar ou atualizar uma pessoa (upsert)
  async upsertPerson(personData) {
    try {
      const response = await fetch(`/api/v3/people`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(personData)
      });

      if (!response.ok) {
        throw new Error(`Erro na API do Agendor: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erro ao fazer upsert de pessoa no Agendor:', error);
      throw error;
    }
  }

  // Converter dados do formulário para o formato da API do Agendor
  formatPersonData(formData) {
    const personData = {
      name: formData.name,
      contact: {
        email: formData.email,
        work: formData.phone
      },
      description: this.buildDescription(formData),
      customFields: {
        'tamanho_equipe': formData.teamSize,
        'nivel_necessidade': formData.needLevel,
        'urgencia': formData.urgency,
        'outras_pessoas': formData.otherPeople
      }
    };

    // Se tiver nome da empresa, adiciona como organização
    if (formData.company) {
      personData.organization = {
        name: formData.company
      };
    }

    return personData;
  }

  // Construir descrição com base nos dados coletados
  buildDescription(formData) {
    return `Lead gerado via formulário techFATTOcs:
    
Empresa: ${formData.company || 'Não informado'}
Necessidade: ${formData.need || 'Não informado'}
Autoavaliação: ${formData.selfAssessment || 'Não informado'}
Tamanho da equipe: ${formData.teamSize || 'Não informado'}
Data de captura: ${new Date().toLocaleString('pt-BR')}`;
  }

  // Enviar dados do lead para o Agendor
  async sendLead(formData) {
    try {
      const personData = this.formatPersonData(formData);

      // Usar upsert para evitar duplicatas
      const result = await this.upsertPerson(personData);

      console.log('Lead enviado com sucesso para o Agendor:', result);
      return result;
    } catch (error) {
      console.error('Erro ao enviar lead para o Agendor:', error);
      throw error;
    }
  }
}

// Função para criar instância do serviço
export const createAgendorService = (apiToken) => {
  if (!apiToken) {
    console.warn('Token da API do Agendor não fornecido. Integração desabilitada.');
    return null;
  }
  return new AgendorService(apiToken);
};

export default AgendorService;

