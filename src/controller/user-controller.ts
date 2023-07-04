import { IUser } from '../model/user';
import UserService from '../services/user-service';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { successResponse, validateUserData } from '../utils/helpers';

const service = new UserService();

export default class UsersControllerImpl {
  constructor() {}
  getUsers(req: IncomingMessage, res: ServerResponse) {
    const data = service.getUsers();
    successResponse(res, 200, data);
  }
  getUser(req: IncomingMessage, res: ServerResponse, id: string) {}

  async createUser(req: IncomingMessage, res: ServerResponse) {
    try {
      const body: IUser = await bodyParser(req);
      await this.validateReqData(body);
      const user = service.addUser(body);
      successResponse(res, 201, user);
    } catch {
      throw new Error();
    }
  }
  //   async createUser(req: IncomingMessage, res: ServerResponse) {
  //     const data: IUser = await bodyParser(req);
  //     successResponse(res, 201, data);
  //     console.log(data);
  //   }

  save() {}
  getAll() {
    return service.getUsers();
  }

  async validateReqData(user: IUser) {
    if (!user.username.length) {
      throw new Error('Body does not contain username');
    }
    if (!user.age) {
      throw new Error('Body does not contain username');
    }
    if (!user.hobbies.length) {
      throw new Error('Body does not contain username');
    }
  }
}

function bodyParser(req: IncomingMessage): Promise<IUser> {
  let data: string = '';

  return new Promise((resolve, reject) => {
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      const res: IUser = JSON.parse(data);
      resolve(res);

      // console.log(user);
    });
    req.on('error', (err) => reject(err));
  });

  //   return new Promise((resolve, reject) => {

  //   });
}
