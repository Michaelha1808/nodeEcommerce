"use strict";
const { AuthFailureError } = require("../core/error.respone");
const { roleList } = require("../services/rbac.service");
const rbac = require("./role.middleware");
/**
 *
 * @param {*} action // read, delete or update
 * @param {*} resource // profile,balanced
 */
const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      rbac.setGrants(
        await roleList({
          userId: 9999,
        })
      );
      const rol_name = req.query.role;
      const permission = rbac.can(rol_name)[action](resource);
      if (!permission.granted) {
        throw new AuthFailureError("you do not have permission");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  grantAccess,
};
