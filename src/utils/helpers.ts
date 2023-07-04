import { ServerResponse } from 'http';
import { IUser } from '../model/user';

export function successResponse(res: ServerResponse, statusCode: number, data: {}) {
  console.log('succes responce');

  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}
const Errors = {
  USERNAME_NOT_FOUND: 'asd',
  AGE_NOT_FOUND: 'AGE_NOT_FOUND',
  HOBBIES_NOT_FOUND: 'HOBBIES_NOT_FOUND',
};
export function validateUserData(user: IUser) {
  if (user.username === undefined || user.username.trim() === '') {
    return Errors.USERNAME_NOT_FOUND;
  } else if (user.age === undefined) {
    return Errors.AGE_NOT_FOUND;
  } else if (user.hobbies === undefined) {
    return Errors.HOBBIES_NOT_FOUND;
  } else {
    return '';
  }
}
