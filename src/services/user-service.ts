import { IUser } from '../model/user';
import * as uuid from 'uuid';
import { IncomingMessage } from 'http';
const users: IUser[] = [];

export default class UserService {
  getUsers() {
    return users;
  }
  addUser(user: IUser): IUser {
    const id = uuid.v4().toString();
    const newUser: IUser = {
      id,
      ...user,
    };

    users.push(newUser);
    return newUser;
  }
  updateUser(id: string) {
    // const user =
  }
  deleteUser(id: string) {}
}
