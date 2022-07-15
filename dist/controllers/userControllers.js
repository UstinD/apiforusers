"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.postUser = exports.getUsers = exports.getUser = void 0;
const users_1 = require("../repository/users");
const uuid_1 = require("uuid");
const getUser = (req, res) => {
    const found = users_1.users.some((user) => Number(user.id) === parseInt(req.params.id));
    if (found) {
        return res.json(users_1.users.filter((user) => Number(user.id) === parseInt(req.params.id)));
    }
    else {
        return res.sendStatus(400);
    }
};
exports.getUser = getUser;
const getUsers = (req, res) => {
    return res.json(users_1.users);
};
exports.getUsers = getUsers;
const postUser = (req, res) => {
    const newUser = {
        id: (0, uuid_1.v4)(),
        name: req.body.name,
        email: req.body.email
    };
    if (!newUser.name || !newUser.email) {
        return res.sendStatus(400);
    }
    users_1.users.push(newUser);
    return res.json(users_1.users);
};
exports.postUser = postUser;
const updateUser = (req, res) => {
    const found = users_1.users.some((user) => Number(user.id) === parseInt(req.params.id));
    if (found) {
        const updateUser = req.body;
        users_1.users.forEach((user) => {
            if (Number(user.id) === parseInt(req.params.id)) {
                user.name = updateUser.name ? updateUser.name : user.name;
                user.email = updateUser.email ? updateUser.email : user.email;
                return res.json({ msg: 'User updated', user });
            }
        });
    }
    else {
        return res.sendStatus(400);
    }
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const found = users_1.users.some((user) => Number(user.id) === parseInt(req.params.id));
    if (found) {
        const indexOfObject = users_1.users.findIndex((user) => {
            return user.id === req.params.id;
        });
        if (indexOfObject !== -1) {
            users_1.users.splice(indexOfObject, 1);
        }
        return res.json({
            msg: 'User deleted',
            users: users_1.users
        });
    }
    else {
        return res.sendStatus(400);
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userControllers.js.map