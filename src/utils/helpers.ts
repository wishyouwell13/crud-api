import { ServerResponse } from 'http';
import { IUser } from '../model/user';

export function generateResponse(res: ServerResponse, statusCode: number, data: {}) {
  console.log('succes responce');

  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}
