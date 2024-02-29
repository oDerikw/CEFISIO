import type { Session } from 'src/models/session';

class SessionsApi {
  getSessions(): Promise<Session[]> {
    const sessions: Session[] = [
      {
        id: '1',
        name: 'Roberto Carlos 1',
        description: 'Roberto Carlos Descrição da Sessão 1',
        type: 'Fisioterapia',
        status: 'feito',
      },
      {
        id: '2',
        name: 'Roberto Carlos 1',
        description: 'Roberto Carlos Descrição da Sessão 2',
        type: 'Fisioterapia',
        status: 'feito',
      },
      {
        id: '3',
        name: 'Roberto Carlos 1',
        description: 'Roberto Carlos Descrição da Sessão 3',
        type: 'Fisioterapia',
        status: 'cancelado',
      },
      {
        id: '4',
        name: 'Roberto Carlos 1',
        description: 'Roberto Carlos Descrição da Sessão 4',
        type: 'Fisioterapia',
        status: 'feito',
      },
      {
        id: '5',
        name: 'Roberto Carlos 1',
        description: 'Roberto Carlos Descrição da Sessão 5',
        type: 'Fisioterapia',
        status: 'cancelado',
      },
      {
        id: '6',
        name: 'Roberto Carlos 1',
        description: 'Roberto Carlos Descrição da Sessão 6',
        type: 'Fisioterapia',
        status: 'marcado',
      },
    ];

    return Promise.resolve(sessions);
  }

  getSession(): Promise<Session> {
    const session: Session = {
      id: '1',
      name: 'Roberto Carlos 1',
      description: 'Roberto Carlos Descrição da Sessão 1',
      type: 'Fisioterapia',
      status: 'feito',
    };

    return Promise.resolve(session);
  }
}

export const sessionsApi = new SessionsApi();
