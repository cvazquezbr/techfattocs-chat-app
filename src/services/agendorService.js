class AgendorService {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token token ${apiToken}`,
    };
  }

  async upsertPerson(personData) {
    const res = await fetch(`/api/v3/people`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(personData),
    });

    if (!res.ok) {
      // log completo do body
      const text = await res.text();
      console.log('Agendor retornou erro:', res.status, text);
      throw new Error(`Agendor API error ${res.status}: ${text}`);
    }
    return res.json();
  }

  formatPersonData(formData) {
    const personData = {
      name: formData.name,
      contact: {
        email: formData.email,
        work: formData.phone,
      },
      description: this.buildDescription(formData),
      customFields: {
        necessidade: formData.need,
        auto_avaliacao: formData.selfAssessment, 
        tamanho_equipe: formData.teamSize ,
      },
    };

    return personData;
  }

  buildDescription(formData) {
    return `Lead gerado via formulário techFATTOcs:

Necessidade: ${formData.need || 'Não informado'}
Autoavaliação: ${formData.selfAssessment || 'Não informado'}
Tamanho da equipe: ${formData.teamSize || 'Não informado'}
Data de captura: ${new Date().toLocaleString('pt-BR')}`;
  }

  async sendLead(formData) {
    const personData = this.formatPersonData(formData);
    return this.upsertPerson(personData);
  }
}

export const createAgendorService = (token) =>
  token ? new AgendorService(token)
    : (console.warn('Sem token Agendor'), null);

export default AgendorService;
