import { IUser } from '../model/user';
import UserService from '../services/user-service';
import { IncomingMessage, ServerResponse } from 'http';
import { generateResponse } from '../utils/helpers';
import * as uuid from 'uuid';

const userService = new UserService();

export default class UsersControllerImpl {
  constructor() {}
  async updateUser(req: IncomingMessage, res: ServerResponse, id: string) {
    try {
      if (!uuid.validate(id)) {
        throw new RequestError('UserId is invalid', 400);
      }
      const body: IUser = await bodyParser(req);

      await this.validateReqData(body);
      const user: IUser | undefined = await userService.update(id, body);
      if (!user) throw new RequestError(`Record with id=${id} doesn't exist.`, 404);

      generateResponse(res, 200, user);
    } catch (err) {
      if (err instanceof RequestError) {
        const data = { message: err.message };
        generateResponse(res, err.code, data);
      }
    }
  }
  getUsers(req: IncomingMessage, res: ServerResponse) {
    const data = userService.getUsers();
    generateResponse(res, 200, data);
  }
  async getUser(req: IncomingMessage, res: ServerResponse, id: string) {
    try {
      if (!uuid.validate(id)) {
        throw new RequestError('UserId is invalid', 400);
      }
      const user: IUser | undefined = await userService.find(id);

      if (!user) throw new RequestError(`Record with id=${id} doesn't exist.`, 404);

      generateResponse(res, 200, user);
    } catch (err) {
      if (err instanceof RequestError) {
        const data = { message: err.message };
        generateResponse(res, err.code, data);
      }
    }
  }

  async deleteUser(req: IncomingMessage, res: ServerResponse, id: string) {
    try {
      if (!uuid.validate(id)) {
        throw new RequestError('UserId is invalid', 400);
      }
      const user: IUser | undefined = await userService.delete(id);

      if (!user) throw new RequestError(`Record with id=${id} doesn't exist.`, 404);

      generateResponse(res, 200, user);
    } catch (err) {
      if (err instanceof RequestError) {
        const data = { message: err.message };
        generateResponse(res, err.code, data);
      }
    }
  }

  async createUser(req: IncomingMessage, res: ServerResponse) {
    try {
      const body: IUser = await bodyParser(req);
      await this.validateReqData(body);
      const user = userService.add(body);
      generateResponse(res, 201, user);
    } catch (err) {
      if (err instanceof RequestError) {
        const data = { message: err.message };
        generateResponse(res, err.code, data);
      }
    }
  }
  getAll() {
    return userService.getUsers();
  }

  async validateReqData(user: IUser) {
    if (!user.username.length) {
      throw new RequestError('Body does not contain username');
    }
    if (!user.age) {
      throw new RequestError('Body does not contain age');
    }
    if (!user.hobbies.length) {
      throw new RequestError('Body does not contain hobbies');
    }
  }
}

class RequestError extends Error {
  code: number = 400;
  constructor(message: string, code?: number) {
    super(message);
    this.name = 'RequestError';
    this.code = code || 400;
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
}
