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
exports.getOrgUsers = exports.deleteOrg = exports.updateOrg = exports.postOrg = exports.getOrgs = exports.getOrg = void 0;
const orgs_1 = require("../repository/orgs");
const uuid_1 = require("uuid");
const ajv_1 = __importDefault(require("ajv"));
const getOrg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgs = new orgs_1.Orgs();
    const listoforgs = yield orgs.getOrg(req.params.orgID);
    return res.json(listoforgs);
});
exports.getOrg = getOrg;
const getOrgs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgs = new orgs_1.Orgs();
    const listoforgs = yield orgs.getOrgs();
    return res.json(listoforgs);
});
exports.getOrgs = getOrgs;
const postOrg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newId = (0, uuid_1.v4)();
    const ajv = new ajv_1.default();
    const schema = {
        type: 'object',
        properties: {
            org_id: { type: 'string' },
            org_name: { type: 'string' },
            motto: { type: 'string' }
        },
        required: ['org_id', 'org_name', 'motto']
    };
    const neworg = {
        org_id: newId,
        org_name: req.body.org_name,
        motto: req.body.motto
    };
    const validate = ajv.compile(schema);
    const valid = validate(neworg);
    if (!valid) {
        return res.json({
            msg: `your request was not valid because ${JSON.stringify(validate.errors)}`
        });
    }
    const orgs = new orgs_1.Orgs();
    const listoforgs = yield orgs.postOrg(newId, req.body.org_name, req.body.motto);
    return res.json(listoforgs);
});
exports.postOrg = postOrg;
const updateOrg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const org = new orgs_1.Orgs();
    const foundOrg = yield org.getOrg(req.params.orgID);
    if (foundOrg) {
        const ajv = new ajv_1.default();
        const schema = {
            type: 'object',
            properties: {
                org_id: { type: 'string' },
                org_name: { type: 'string' },
                motto: { type: 'string' }
            },
            required: ['org_id', 'org_name', 'motto']
        };
        let thename = foundOrg.org_name;
        let themotto = foundOrg.motto;
        if (typeof req.body.org_name === 'string') {
            thename = req.body.org_name;
        }
        if (typeof req.body.motto === 'string') {
            themotto = req.body.motto;
        }
        const updatedorg = {
            org_id: req.params.orgID,
            org_name: thename,
            motto: themotto
        };
        const validate = ajv.compile(schema);
        const valid = validate(updatedorg);
        if (!valid) {
            return res.json({
                msg: `your request was not valid because ${JSON.stringify(validate.errors)}`
            });
        }
        const didupdate = yield org.updateOrg(req.params.orgID, thename, themotto);
        if (didupdate) {
            return res.json({ msg: 'org updated', updatedorg });
        }
        return res.sendStatus(404);
    }
    else {
        return res.sendStatus(404);
    }
});
exports.updateOrg = updateOrg;
const deleteOrg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgs = new orgs_1.Orgs();
    const diddelete = yield orgs.deleteOrg(req.params.orgID);
    if (diddelete) {
        const listoforgs = yield orgs.getOrgs();
        return res.json({
            msg: 'org deleted',
            listoforgs
        });
    }
    return res.sendStatus(404);
});
exports.deleteOrg = deleteOrg;
const getOrgUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgs = new orgs_1.Orgs();
    const listoforgs = yield orgs.getOrgUsers(req.params.orgID);
    return res.json(listoforgs);
});
exports.getOrgUsers = getOrgUsers;
//# sourceMappingURL=orgControllers.js.map