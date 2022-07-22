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
exports.Users = void 0;
const pg_1 = require("pg");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Users {
    constructor() {
        this.pool = new pg_1.Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'user_data',
            password: 'shweetie',
            port: 5432
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield this.pool.query('SELECT * FROM users');
                return allUsers.rows;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const theUser = yield this.pool.query(`SELECT * FROM users WHERE user_id IN ('${id}')`);
                return theUser.rows;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    postUser(id, name, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.query(`INSERT INTO users (user_id, username, password, email) VALUES ('${id}', '${name}', '${password}', '${email}')`);
                const allUsers = yield this.pool.query('SELECT * FROM users');
                return allUsers.rows;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diddelete = yield this.pool.query(`DELETE FROM users where user_id = '${id}'`);
                if (diddelete) {
                    return true;
                }
                return false;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    updateUser(id, name, email, orgid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update = yield this.pool.query(`UPDATE users SET username = '${name}', email = '${email}', org_id = '${orgid}'  WHERE user_id = '${id}'`);
                if (update) {
                    return true;
                }
                return false;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    signIn(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SECRET = 'MY_SECRET_KEY';
                const theUser = yield this.pool.query(`SELECT * FROM users WHERE username IN ('${name}')`);
                if (theUser.rows.length == 1) {
                    const isValid = bcryptjs_1.default.compareSync(password, theUser.rows[0].password);
                    if (!isValid) {
                        return 'false';
                    }
                    const token = jsonwebtoken_1.default.sign({ id: theUser.rows[0].user_id }, SECRET, {
                        expiresIn: 86400
                    });
                    return token;
                }
                return 'false';
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
}
exports.Users = Users;
//# sourceMappingURL=users.js.map