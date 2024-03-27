const AccessService = require("../services/access.service");

const { CREATED, OK, SuccessRespone } = require("../core/success.respone");
const { BadRequestError } = require("../core/error.respone");

class AccessController {
  handlerRefreshToken = async (req, res, next) => {
    // new SuccessRespone({
    //     message: 'Get token success!',
    //     metadata: await AccessService.handlerRefreshToken(req.body.refreshToken),
    // }).send(res)

    //* version 2 fixed, no need accessToken
    new SuccessRespone({
      message: "Get token success!",
      metadata: await AccessService.handlerRefreshTokenV2({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  };

  logout = async (req, res, next) => {
    new SuccessRespone({
      message: "Logout success!",
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  };

  login = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      throw new BadRequestError("email missing");
    }
    new SuccessRespone({
      metadata: await AccessService.login(req.body),
    }).send(res);
  };

  signUp = async (req, res, next) => {
    new CREATED({
      message: "Registered OK!",
      metadata: await AccessService.signUp(req.body),
      options: {
        limit: 9,
      },
    }).send(res);
    //  return res.status(201).json( await AccessService.signUp(req.body))
  };
}
module.exports = new AccessController();
