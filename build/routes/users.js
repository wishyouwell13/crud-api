"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersHandler = void 0;
const user_controller_1 = __importDefault(require("../controller/user-controller"));
const helpers_1 = require("../utils/helpers");
const controller = new user_controller_1.default();
const USERS_URL = '/api/users';
const usersHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const urlParts = req.url.split('/');
    const id = urlParts[3] || '';
    const method = req.method;
    //   let data: IUser[] = [];
    let pathArray = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split('/');
    const handlerPattern = `${method}: `;
    switch (method) {
        case 'GET':
            if (id.length) {
                controller.getUser(req, res, id);
            }
            else {
                controller.getUsers(req, res);
            }
            //   generateResponse(res, 200, data);
            break;
        case 'POST':
            yield controller.createUser(req, res);
            //   generateResponse(res, 200, data);
            break;
        case 'DELETE':
            controller.deleteUser(req, res, id);
            break;
        case 'PUT':
            controller.updateUser(req, res, id);
            break;
        default:
            (0, helpers_1.generateResponse)(res, 400, []);
            break;
    }
});
exports.usersHandler = usersHandler;
//# sourceMappingURL=users.js.map