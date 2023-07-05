import User, { IUser } from '../model/user';

const USERS: IUser[] = [];

export default class UserService {
  public users: IUser[];

  constructor() {
    this.users = USERS;
  }
  getUsers() {
    return this.users;
  }
  add(data: IUser) {
    const newUser = new User(data);

    this.users.push(newUser);
    return newUser;
  }
  async update(id: string, data: IUser) {
    const targetUser: IUser | undefined = await this.find(id);
    if (!targetUser) {
      return undefined;
    }
    this.users = this.users.map((user) => (user.id === id ? { ...user, ...data } : user));
    return data;
  }

  async delete(_id: string) {
    const targetUser: IUser | undefined = await this.find(_id);
    if (!targetUser) {
      return;
    }
    this.users = this.users.filter(({ id }) => id !== _id);
    return targetUser;
  }

  async find(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
