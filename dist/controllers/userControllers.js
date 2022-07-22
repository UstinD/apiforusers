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
exports.login = exports.deleteUser = exports.updateUser = exports.postUser = exports.getUsers = exports.getUser = void 0;
const users_1 = require("../repository/users");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ajv_1 = __importDefault(require("ajv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.substring(7);
        jsonwebtoken_1.default.verify(token, 'MY_SECRET_KEY');
    }
    catch (err) {
        return res.json({
            msg: 'you are not authorized to view user'
        });
    }
    const users = new users_1.Users();
    const listofusers = yield users.getUser(req.params.id);
    if (listofusers.length < 1) {
        return res.sendStatus(404);
    }
    return res.json(listofusers[0]);
});
exports.getUser = getUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = new users_1.Users();
    const listofusers = yield users.getUsers();
    return res.json(listofusers);
});
exports.getUsers = getUsers;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newId = (0, uuid_1.v4)();
    const ajv = new ajv_1.default();
    const schema = {
        type: 'object',
        properties: {
            user_id: { type: 'string' },
            username: { type: 'string' },
            password: { type: 'string' },
            email: { type: 'string' }
        },
        required: ['user_id', 'username', 'password', 'email']
    };
    const newuser = {
        user_id: newId,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    };
    const validate = ajv.compile(schema);
    const valid = validate(newuser);
    if (!valid) {
        return res.json({
            msg: `your request was not valid because ${JSON.stringify(validate.errors)}`
        });
    }
    const hashedpassword = bcryptjs_1.default.hashSync(req.body.password, 8);
    const users = new users_1.Users();
    const listofusers = yield users.postUser(newId, req.body.username, hashedpassword, req.body.email);
    return res.json(listofusers);
});
exports.postUser = postUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new users_1.Users();
    const foundUserlist = yield user.getUser(req.params.id);
    const foundUser = foundUserlist[0];
    if (foundUser) {
        const ajv = new ajv_1.default();
        const schema = {
            type: 'object',
            properties: {
                user_id: { type: 'string' },
                username: { type: 'string' },
                password: { type: 'string' },
                email: { type: 'string' },
                org_id: { type: ['string', 'null'] }
            },
            required: ['user_id', 'username', 'password', 'email', 'org_id']
        };
        let thename = foundUser.username;
        let theemail = foundUser.email;
        let theorgid = foundUser.org_id;
        if (typeof req.body.username === 'string') {
            thename = req.body.username;
        }
        if (typeof req.body.email === 'string') {
            theemail = req.body.email;
        }
        if (typeof req.body.org_id === 'string') {
            theorgid = req.body.org_id;
        }
        const updateduser = {
            user_id: req.params.id,
            username: thename,
            password: foundUser.password,
            email: theemail,
            org_id: theorgid
        };
        const validate = ajv.compile(schema);
        const valid = validate(updateduser);
        if (!valid) {
            return res.json({
                msg: `your request was not valid because ${JSON.stringify(validate.errors)}`
            });
        }
        const didupdate = yield user.updateUser(req.params.id, thename, theemail, theorgid);
        if (didupdate) {
            return res.json({ msg: 'org updated', updateduser });
        }
        return res.sendStatus(404);
    }
    else {
        return res.sendStatus(404);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = new users_1.Users();
    const diddelete = yield users.deleteUser(req.params.id);
    if (diddelete) {
        const listofusers = yield users.getUsers();
        return res.json({
            msg: 'user deleted',
            listofusers
        });
    }
    return res.sendStatus(404);
});
exports.deleteUser = deleteUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = new users_1.Users();
    const didlogin = yield users.signIn(req.body.username, req.body.password);
    if (didlogin == 'false') {
        return res.json({
            msg: 'username or password was incorrect'
        });
    }
    return res.json({
        msg: 'login successful',
        accesstoken: didlogin
    });
});
exports.login = login;
//# sourceMappingURL=userControllers.js.map