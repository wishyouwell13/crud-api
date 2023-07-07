import { IncomingMessage, ServerResponse } from 'http';
import UsersController from '../controller/user-controller';
import UserService from '../services/user-service';

import { generateResponse } from '../utils/helpers';

const controller = new UsersController(new UserService());

export const usersHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const urlParts = req.url!.split('/');
  const id = urlParts[3] || '';
  const method = req.method;

  switch (method) {
    case 'GET':
      if (id.length) {
        controller.getUser(req, res, id);
      } else {
        controller.getUsers(req, res);
      }
      //   generateResponse(res, 200, data);
      break;
    case 'POST':
      await controller.createUser(req, res);
      //   generateResponse(res, 200, data);
      break;

    case 'DELETE':
      controller.deleteUser(req, res, id);
      break;
    case 'PUT':
      controller.updateUser(req, res, id);
      break;
    default:
      generateResponse(res, 400, []);
      break;
  }
};
