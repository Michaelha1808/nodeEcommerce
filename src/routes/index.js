const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();

// router.get('',(req,res,next)=>{
//     return  res.status(200).json({
//         message:"welcome",
//     })
// })
//todo check apikey
router.use(apiKey);
//todo check permission
router.use(permission("0000"));

router.use("/v1/api/checkout", require("./checkout"));
router.use("/v1/api/profile", require("./profile"));
router.use("/v1/api/discount", require("./discount"));
router.use("/v1/api/cart", require("./cart"));
router.use("/v1/api/product", require("./product"));
router.use("/v1/api/comment", require("./comment"));
router.use("/v1/api", require("./access"));

module.exports = router;
