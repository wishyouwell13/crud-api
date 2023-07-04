import { IUser } from '../model/user';
import * as uuid from 'uuid';
import { IncomingMessage } from 'http';
const users: IUser[] = [];

export default class UserService {
  getUsers() {
    return users;
  }
  add(user: IUser): IUser {
    const id = uuid.v4().toString();
    const newUser: IUser = {
      id,
      ...user,
    };

    users.push(newUser);
    return newUser;
  }
  async update(id: string, data: IUser) {
    const targetUser: IUser | undefined = await this.find(id);
    if (!targetUser) {
      return;
    }
    for (let [idx, user] of users.entries()) {
      if (user.id === id) {
        users[idx] = data;
        break;
      }
    }
    return data;
  }

  async delete(id: string) {
    const targetUser: IUser | undefined = await this.find(id);
    if (!targetUser) {
      return;
    }
    for (let [idx, user] of users.entries()) {
      if (user.id === targetUser.id) {
        users.splice(idx, 1);
        break;
      }
    }
    return targetUser;
  }

  async find(id: string) {
    return users.find((user) => user.id === id);
  }
}
