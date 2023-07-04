import UsersController from '../controller/user-controller';
import { IncomingMessage, ServerResponse } from 'http';
import UserService from '../services/user-service';

import { successResponse } from '../utils/helpers';
import { IUser } from '../model/user';

const controller = new UsersController();
const USERS_URL = '/api/users';

export const usersHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const urlParts = req.url!.split('/');

  const id = urlParts[3] || '';

  const method = req.method;

  //   let data: IUser[] = [];
  let pathArray = req.url?.split('/');

  const handlerPattern = `${method}: `;

  switch (method) {
    case 'GET':
      if (id.length) {
        controller.getUser(req, res, id);
      } else {
        controller.getUsers(req, res);
      }
      //   successResponse(res, 200, data);
      break;
    case 'POST':
      console.log('pos');

      await controller.createUser(req, res);
      //   successResponse(res, 200, data);
      break;

    case 'DELETE':
      if (id.length) {
        controller.deleteUser(req, res, id);
      }
      break;
    default:
      successResponse(res, 400, []);
      break;
  }
};
