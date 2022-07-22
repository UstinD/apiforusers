"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const userControllers_2 = require("../controllers/userControllers");
const userControllers_3 = require("../controllers/userControllers");
const userControllers_4 = require("../controllers/userControllers");
const userControllers_5 = require("../controllers/userControllers");
const userControllers_6 = require("../controllers/userControllers");
const router = (0, express_1.default)();
router.route('/:id').get(userControllers_1.getUser);
router.route('/').get(userControllers_2.getUsers);
router.route('/:id').put(userControllers_3.updateUser);
router.route('/').post(userControllers_4.postUser);
router.route('/:id').delete(userControllers_5.deleteUser);
router.route('/login').post(userControllers_6.login);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map