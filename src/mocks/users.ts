import type { User } from 'src/models/user';

class UsersApi {
  getUsers(): Promise<User[]> {
    const users: User[] = [
      {
        id: '1',
        avatar: '',
        name: 'Roberto Carlos 1',
        email: 'roberto@gmail.com',
        phone: 1926548764,
        cpf: 21345678964,
        role: 'secretarians',
      },
      {
        id: '2',
        avatar: '',
        name: 'Roberto Andre',
        email: 'andre@gmail.com',
        phone: 1926548764,
        cpf: 32145678964,
        role: 'supervisors',
      },
      {
        id: '3',
        avatar: '',
        name: 'Marcos Andre',
        email: 'marcos@gmail.com',
        phone: 1926548764,
        cpf: 43215678964,
        role: 'apprentices',
      },
      {
        id: '4',
        avatar: '',
        name: 'Pedro Santos',
        email: 'pedro@gmail.com',
        phone: 1926548764,
        cpf: 53421678964,
        role: 'patients',
      },
      {
        id: '5',
        avatar: '',
        name: 'Gabriel Santos',
        email: 'gabriel@gmail.com',
        phone: 1945648764,
        cpf: 23121678964,
        role: 'patients',
      },
      {
        id: '6',
        avatar: '',
        name: 'Lucas Lopes',
        email: 'lops@gmail.com',
        phone: 124565643,
        cpf: 98721678964,
        role: 'patients',
      },
    ];

    return Promise.resolve(users);
  }

  getUser(): Promise<User> {
    const user: User = {
      id: '1',
        avatar: '',
        name: 'Roberto Carlos 1',
        email: 'carlos1@yahoo.com',
        phone: 1926548764,
        cpf: 12345678964,
        role: 'secretarians',
    };

    return Promise.resolve(user);
  }
}

export const usersApi = new UsersApi();
