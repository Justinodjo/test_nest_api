"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
class User {
    id;
    email;
    username;
    password;
    role;
    createdAt;
    updatedAt;
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map