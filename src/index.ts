import { createServer, IncomingMessage, ServerResponse } from 'http';
import { usersHandler } from './routes/users';
import dotenv from 'dotenv';
// helpers
import { generateResponse } from './utils/helpers';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  try {
    let path = req.url!.split('/');

    switch (`/${path[1]}/${path[2]}`) {
      case '/api/users':
        usersHandler(req, res);
        break;
      default:
        generateResponse(res, 404, { message: 'Requests to non-existing endpoint' });
        break;
    }
  } catch {
    generateResponse(res, 500, {
      message: 'Errors on the server side that occur during the processing of a request ',
    });
  }
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(PORT);
