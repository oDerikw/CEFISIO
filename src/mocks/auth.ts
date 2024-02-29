import { randomId } from 'src/utils/randomId';
import { sign, JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
import { wait } from 'src/utils/wait';
import axios from 'axios'; 

const users = [
  {
    id: '1',
    avatar: '',
    name: 'Roberto Carlos 1',
    email: 'roberto@gmail.com',
    password: '12345678',
    phone: 1926548764,
    cpf: 21345678964,
    role: 'secretarians',
  }
];

class AuthApi {

  async login({ email, password }): Promise<string> {
    await wait(500);

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
          email: email,
          password: password
        });

        console.log(response.data);

        const accessToken = response.data.access_token;

        resolve(accessToken);
        
      } catch (err) {
        
        if (err.response && err.response.status === 401) {
          reject(new Error('E-mail ou senha inválidos' ));
        } else {
          
          reject(new Error('Erro interno do servidor'));
        }
      }
    });
  }
 

  async register({ email, name, password }): Promise<string> {
    await wait(1000);
    console.log("entraa aq");
    return new Promise((resolve, reject) => {
      try {
        let user = users.find((_user) => _user.email === email);

        if (user) {
          reject(new Error('E-mail já em uso'));
          return;
        }

        user = {
          id: randomId(),
          avatar: null,
          name,
          email,
          password,
          phone: null,
          cpf: null,
          role: 'secretarians',
        };

        users.push(user);

        const accessToken = sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN
        });

        resolve(accessToken);
      } catch (err) {
        console.error(err);
        reject(new Error('Erro interno do servidor'));
      }
    });
  }
  me(accessToken) {
    return new Promise((resolve, reject) => {
      try {
        const apiUrl = `https://api.escuelajs.co/api/v1/auth/profile`; 
  
        axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then(response => {
          const user = response.data;
          console.log(response.data);
          resolve(user);
        })
        .catch(error => {
          reject(new Error('Erro ao obter dados do usuário: ' + error.message));
        });
      } catch (err) {
        console.error(err);
        reject(new Error('Erro interno do servidor'));
      }
    });
  }
  
}

export const authApi = new AuthApi();
