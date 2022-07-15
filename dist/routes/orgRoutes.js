"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orgControllers_1 = require("../controllers/orgControllers");
const orgControllers_2 = require("../controllers/orgControllers");
const orgControllers_3 = require("../controllers/orgControllers");
const orgControllers_4 = require("../controllers/orgControllers");
const orgControllers_5 = require("../controllers/orgControllers");
const router = (0, express_1.default)();
router.route('/:id').get(orgControllers_1.getOrg);
router.route('/').get(orgControllers_2.getOrgs);
router.route('/:id').put(orgControllers_3.updateOrg);
router.route('/').post(orgControllers_4.postOrg);
router.route('/:id').delete(orgControllers_5.deleteOrg);
exports.default = router;
//# sourceMappingURL=orgRoutes.js.map