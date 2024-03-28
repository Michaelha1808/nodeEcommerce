"use strict";
const { SuccessRespone } = require("../core/success.respone");

const dataProfiles = [
  {
    usr: 1,
    usr_name: "CR7",
    usr_avatar: "image.com/user/1",
  },
  { sr: 2, usr_name: "M10", usr_avatar: "image.com/user/2" },
  { sr: 3, usr_name: "MICHAEL", usr_avatar: "image.com/user/3" },
];
class profileController {
  // admin
  profiles = async (req, res, next) => {
    new SuccessRespone({
      message: "view all profiles",
      metadata: dataProfiles,
    }).send(res);
  };
  // shop
  profile = async (req, res, next) => {
    new SuccessRespone({
      message: "view one profile",
      metadata: { sr: 3, usr_name: "MICHAEL", usr_avatar: "image.com/user/3" },
    }).send(res);
  };
}

module.exports = new profileController();
