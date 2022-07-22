"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orgControllers_1 = require("../controllers/orgControllers");
const router = (0, express_1.default)();
router.route('/:orgID').get(orgControllers_1.getOrg);
router.route('/').get(orgControllers_1.getOrgs);
router.route('/:orgID').patch(orgControllers_1.updateOrg);
router.route('/').post(orgControllers_1.postOrg);
router.route('/:orgID').delete(orgControllers_1.deleteOrg);
router.route('/:orgID/users').get(orgControllers_1.getOrgUsers);
exports.default = router;
//# sourceMappingURL=orgRoutes.js.map