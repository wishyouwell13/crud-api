"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = void 0;
// import { IUser } from '../model/user';
function generateResponse(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}
exports.generateResponse = generateResponse;
//# sourceMappingURL=helpers.js.map