import { createServer, IncomingMessage, ServerResponse } from 'http';
import { usersHandler } from './routes/users';
import dotenv from 'dotenv';
import url from 'url';

import { successResponse } from './utils/helpers';
dotenv.config();
const PORT = process.env.PORT || 4000;

// const server = createServer((req: IncomingMessage, res: ServerResponse) => {
//   console.log(req.method);

//   successResponse(res, 200, []);
// });

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  try {
    const { pathname } = url.parse(<string>req.url, true);

    switch (pathname) {
      case '/api/users':
        usersHandler(req, res);
        break;
      default:
        res.end('asd');
        break;
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: false,
        error: error,
      }),
    );
  }
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(PORT);
