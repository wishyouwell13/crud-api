"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const users_1 = require("./routes/users");
const dotenv_1 = __importDefault(require("dotenv"));
// helpers
const helpers_1 = require("./utils/helpers");
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const server = (0, http_1.createServer)((req, res) => {
    try {
        let path = req.url.split('/');
        switch (`/${path[1]}/${path[2]}`) {
            case '/api/users':
                (0, users_1.usersHandler)(req, res);
                break;
            default:
                (0, helpers_1.generateResponse)(res, 404, { message: 'Requests to non-existing endpoint' });
                break;
        }
    }
    catch (_a) {
        (0, helpers_1.generateResponse)(res, 500, {
            message: 'Errors on the server side that occur during the processing of a request ',
        });
    }
});
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(PORT);
//# sourceMappingURL=index.js.map