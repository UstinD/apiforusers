"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrg = exports.updateOrg = exports.postOrg = exports.getOrgs = exports.getOrg = void 0;
const orgs_1 = require("../repository/orgs");
const uuid_1 = require("uuid");
const getOrg = (req, res) => {
    const foundOrg = orgs_1.orgs.some((org) => Number(org.id) === parseInt(req.params.id));
    if (foundOrg) {
        return res.json(orgs_1.orgs.filter((org) => Number(org.id) === parseInt(req.params.id)));
    }
    else {
        return res.sendStatus(400);
    }
};
exports.getOrg = getOrg;
const getOrgs = (req, res) => {
    return res.json(orgs_1.orgs);
};
exports.getOrgs = getOrgs;
const postOrg = (req, res) => {
    const neworg = {
        id: (0, uuid_1.v4)(),
        name: req.body.name,
        motto: req.body.motto
    };
    if (!neworg.name || !neworg.motto) {
        return res.sendStatus(400);
    }
    orgs_1.orgs.push(neworg);
    return res.json(orgs_1.orgs);
};
exports.postOrg = postOrg;
const updateOrg = (req, res) => {
    const foundOrg = orgs_1.orgs.some((org) => Number(org.id) === parseInt(req.params.id));
    if (foundOrg) {
        const updateorg = req.body;
        orgs_1.orgs.forEach((org) => {
            if (Number(org.id) === parseInt(req.params.id)) {
                org.name = updateorg.name ? updateorg.name : org.name;
                org.motto = updateorg.motto ? updateorg.motto : org.motto;
                return res.json({ msg: 'org updated', org });
            }
        });
    }
    else {
        return res.sendStatus(400);
    }
};
exports.updateOrg = updateOrg;
const deleteOrg = (req, res) => {
    const foundOrg = orgs_1.orgs.some((org) => Number(org.id) === parseInt(req.params.id));
    if (foundOrg) {
        const indexOfObject = orgs_1.orgs.findIndex((org) => {
            return org.id === req.params.id;
        });
        if (indexOfObject !== -1) {
            orgs_1.orgs.splice(indexOfObject, 1);
        }
        return res.json({
            msg: 'org deleted',
            orgs: orgs_1.orgs
        });
    }
    else {
        return res.sendStatus(400);
    }
};
exports.deleteOrg = deleteOrg;
//# sourceMappingURL=orgControllers.js.map