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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orgs = exports.orgsMap = exports.OrgType = void 0;
const pg_1 = require("pg");
var OrgType;
(function (OrgType) {
    OrgType["PRIVATE"] = "private";
    OrgType["PUBLIC"] = "public";
    OrgType["NONPROFIT"] = "non-profit";
})(OrgType = exports.OrgType || (exports.OrgType = {}));
exports.orgsMap = {
    '1': {
        org_id: '1',
        org_name: 'Nike',
        motto: 'Just Do it'
    },
    '2': {
        org_id: '2',
        org_name: 'KFC',
        motto: "Finger Lickin' Good"
    },
    '3': {
        org_id: '3',
        org_name: 'McDonalds',
        motto: "I'm Lovin It"
    },
    '4': {
        org_id: '4',
        org_name: 'Subway',
        motto: 'Eat Fresh'
    }
};
class Orgs {
    constructor() {
        this.pool = new pg_1.Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'user_data',
            password: 'shweetie',
            port: 5432
        });
    }
    getOrgs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allOrgs = yield this.pool.query('SELECT * FROM orgs');
                return allOrgs.rows;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    getOrg(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const theOrg = yield this.pool.query(`SELECT * FROM orgs WHERE org_id IN ('${id}')`);
                return theOrg.rows[0];
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    postOrg(id, name, motto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.query(`INSERT INTO orgs (org_id, org_name, motto) VALUES ('${id}', '${name}', '${motto}')`);
                const allOrgs = yield this.pool.query('SELECT * FROM orgs');
                return allOrgs.rows;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    deleteOrg(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diddelete = yield this.pool.query(`DELETE FROM orgs where org_id = '${id}'`);
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
    updateOrg(id, name, motto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update = yield this.pool.query(`UPDATE orgs SET org_name = '${name}', motto = '${motto}' WHERE org_id = '${id}'`);
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
    getOrgUsers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orgUsers = yield this.pool.query(`SELECT user_id, username FROM users WHERE org_id IN ((SELECT org_id FROM users WHERE org_id IN ('${id}')))`);
                return orgUsers.rows;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
}
exports.Orgs = Orgs;
//# sourceMappingURL=orgs.js.map