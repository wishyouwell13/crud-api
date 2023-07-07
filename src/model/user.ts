import * as uuid from 'uuid';

export interface IUser {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

export default class User {
  public id: string;
  public username: string;
  public age: number;
  public hobbies: string[];

  constructor({ id, username, age, hobbies }: IUser) {
    this.id = id || this.uuidv4();
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }

  private uuidv4(): string {
    return uuid.v4().toString();
  }
}
