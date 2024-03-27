"use strict";

const { SuccessRespone } = require("../core/success.respone");
const { createComment } = require("../services/comment.service");

class CommentController {
  createComment = async (req, res, next) => {
    new SuccessRespone({
      message: "Create new commnet",
      metadata: await createComment(req.body),
    }).send(res);
  };
}
module.exports = new CommentController();
