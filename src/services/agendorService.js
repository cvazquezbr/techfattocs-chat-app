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

  formatPhone(phone) {
    // Remove tudo que não é número, mas preserva o "+" se estiver no início
    const clean = phone.trim().startsWith('+')
      ? '+' + phone.trim().slice(1).replace(/\D/g, '')
      : phone.replace(/\D/g, '');

    let digits = clean;
    let country = '';

    // Verifica se começa com código do país (ex: +55 ou 0055)
    if (digits.startsWith('+')) {
      const match = digits.match(/^\+(\d{1,3})/);
      if (match) {
        country = '+' + match[1];
        digits = digits.slice(match[0].length);
      }
    } else if (digits.startsWith('00')) {
      const match = digits.match(/^00(\d{1,3})/);
      if (match) {
        country = '+' + match[1];
        digits = digits.slice(match[0].length);
      }
    }

    // Agora tratamos apenas o número local (DDD + número)
    if (digits.length <= 2) {
      return `${country} (${digits}`;
    } else if (digits.length <= 6) {
      return `${country} (${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      return `${country} (${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      // 11 dígitos: celular
      return `${country} (${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  }

  formatPersonData(formData) {
    
    const personData = {
      name: formData.name,
      contact: {
        email: formData.email,
        work: this.formatPhone(formData.phone),
      },
      description: this.buildDescription(formData),
      customFields: {
        necessidade: formData.need,
        auto_avaliacao: formData.selfAssessment,
        tamanho_equipe: formData.teamSize,
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
